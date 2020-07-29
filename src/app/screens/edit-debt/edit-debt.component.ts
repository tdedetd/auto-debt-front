import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash, faTimesCircle, faSave, faCheck, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { Participant } from 'src/app/models/participant';
import { ApiService } from 'src/app/services/api.service';
import { PersonalItem } from 'src/app/models/personal-item';
import { CheckItem } from 'src/app/models/check-item';
import { AppStateService } from 'src/app/services/app-state.service';
import { DropdownItemsFunc } from '../../controls/find-textbox/find-textbox.component';
import { DropdownItem } from 'src/app/models/dropdown-item';

type ParticipantDebt = { participant: Participant, sum?: number, color: string };
export type PersonalItemDebt = { participant: ParticipantDebt, personalItem: PersonalItem };
type ItemDebts = { item: CheckItem, personal: PersonalItemDebt[] };

@Component({
  selector: 'ad-edit-debt',
  templateUrl: './edit-debt.component.html',
  styleUrls: ['./edit-debt.component.css']
})
export class EditDebtComponent implements OnInit, OnDestroy {

  actions: Action[] = [
    {
      label: 'Очистить',
      icon: faTimesCircle,
      callback: () => {}
    },
    {
      label: 'Сохранить',
      icon: faSave,
      callback: () => {}
    },
    {
      label: 'Подтвердить чек',
      icon: faCheck,
      callback: () => {}
    },
    {
      label: 'Отменить чек',
      icon: faTrash,
      callback: () => {}
    }
  ];

  addParticipantModalVisible = false;

  addPersonalItemModalVisible = false;

  checkId: number;

  checkInfoSubscription$: Subscription;

  checkOwner: number;

  colors = ['#B7ADEF', '#FAB0B0', '#FACD85', '#75DE91', '#EE8AF2', '#74D9CE'];

  debtsSubscription$: Subscription;

  editMode = true;

  faCheck = faCheck;

  faMoneyBill = faMoneyBill;

  faPlus = faPlus;

  faTrash = faTrash;

  items: ItemDebts[];

  getUsersFunc: DropdownItemsFunc;

  participants: ParticipantDebt[] = [];

  participantAlreadyAddedMessageVisible = false;

  participantForRemoveSelected: ParticipantDebt;

  participantsDropdownItemSelected: DropdownItem;

  personalItems: PersonalItem[];

  removeParticipantModalVisible = false;

  constructor(private activatedRoute: ActivatedRoute,
              private api: ApiService,
              private appState: AppStateService) { }

  ngOnInit() {
    this.checkId = +this.activatedRoute.snapshot.params.checkId;
    if (this.appState.checkInfoSelected && this.appState.checkInfoSelected.id !== this.checkId) {
      this.appState.checkInfoSelected = null;
    }

    if (this.appState.checkInfoSelected && this.appState.checkInfoSelected.id === this.checkId) {
      this.extractCheckItems();
    } else {
      this.checkInfoSubscription$ = this.api.getCheckInfo(this.checkId).subscribe(info => {
        this.appState.checkInfoSelected = info;
        this.extractCheckItems();
      });
    }

    this.debtsSubscription$ = this.api.getCheckDebts(this.checkId).subscribe(debts => {
      this.participants = debts.participants.map((participant, i) => ({
        participant,
        sum: 0,
        color: this.getParticipantColor(i)
      }));
      this.personalItems = debts.personalItems;
      this.extractCheckItems();
    });

    this.getUsersFunc = (query: string) => {
      return this.api.getUsers({ query })
        .pipe(map(users => {
          return users.map<DropdownItem>(user => ({
            label: user.username,
            value: user,
            picture: user.avatar
          }));
        }));
    };
  }

  ngOnDestroy() {
    this.debtsSubscription$.unsubscribe();
    if (this.checkInfoSubscription$) this.checkInfoSubscription$.unsubscribe();
  }

  onAddPersonalItemClick(e) {
    this.addPersonalItemModalVisible = true;
  }

  onAddUserClick() {
    this.addParticipantModalVisible = true;
    this.participantAlreadyAddedMessageVisible = false;
  }

  onAddUserModalAccept() {
    if (this.participantsDropdownItemSelected) {
      if (this.participants.map(part => part.participant.userId)
        .indexOf(this.participantsDropdownItemSelected.value.id) !== -1) {

        this.participantAlreadyAddedMessageVisible = true;
      } else {
        this.addParticipant(this.participantsDropdownItemSelected);
        this.participantsDropdownItemSelected = null;
        this.addParticipantModalVisible = false;
      }
    }
  }

  onRemoveParticipantClick(participant: ParticipantDebt) {
    this.removeParticipantModalVisible = true;
    this.participantForRemoveSelected = participant;
  }

  onRemoveParticipantModalAccept() {
    const userId = this.participantForRemoveSelected.participant.userId;
    this.removeElementFromList(this.participants, this.participantForRemoveSelected);

    const personalItemsForRemove = this.personalItems.filter(personal => personal.userId === userId);
    personalItemsForRemove.forEach(personal => this.removeElementFromList(this.personalItems, personal));

    this.participantForRemoveSelected = null;
    this.extractCheckItems();
    this.updateParticipantsSum();
    this.updatePerticipantsColors();
  }

  isLoaded(): boolean {
    return !!this.appState.checkInfoSelected && !!this.personalItems;
  }

  private addParticipant(participantItem: DropdownItem) {
    const newParticipant: ParticipantDebt = {
      participant: {
        userId: participantItem.value.id,
        username: participantItem.value.username,
        isPaidBack: false
      },
      sum: 0,
      color: 'black'
    };

    this.participants.push(newParticipant);
    this.updateParticipantsSum();
    this.updatePerticipantsColors();
  }

  private addSumToEachParticipant(sum: number) {
    this.participants.forEach(participant => participant.sum += sum);
  }

  private clearSum() {
    this.participants.forEach(participant => participant.sum = 0);
  }

  private getParticipantColor(index: number) {
    return this.colors[index % this.colors.length];
  }

  private extractCheckItems() {
    if (!this.isLoaded()) return;

    this.checkOwner = this.appState.checkInfoSelected.paidBy;

    this.items = this.appState.checkInfoSelected.items.map<ItemDebts>(item => ({ item, personal: [] }));
    this.items.forEach(item => {
      item.personal = this.personalItems
        .filter(personalItem => personalItem.itemId === item.item.id)
        .map<PersonalItemDebt>(personalItem => {
          return {
            participant: this.participants.find(participant => participant.participant.userId === personalItem.userId),
            personalItem
          }
        });
    });

    this.updateParticipantsSum();
  }

  private updatePerticipantsColors() {
    this.participants.forEach((participant, i) => {
      participant.color = this.getParticipantColor(i);
    });
  }

  private updateParticipantsSum() {
    const count = this.participants.length;
    this.clearSum();

    this.items.forEach(item => {
      if (item.personal.length === 0) {
        this.addSumToEachParticipant(+item.item.sum / count);
      } else {
        const partsSum = item.personal.reduce((acc, i) => acc + i.personalItem.part, 0);
        item.personal.forEach(itemPersonal => {
          itemPersonal.participant.sum += item.item.sum * itemPersonal.personalItem.part / partsSum;
        });
      }
    });
    // FIXME: calculated sum not matching
  }

  // TODO: to utils
  private removeElementFromList<T>(list: T[], element: T) {
    const index = list.indexOf(element);
    list.splice(index, 1);
  }

}
