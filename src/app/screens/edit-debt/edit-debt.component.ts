import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash, faTimesCircle, faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { Participant } from 'src/app/models/participant';
import { ApiService } from 'src/app/services/api.service';
import { PersonalItem } from 'src/app/models/personal-item';
import { CheckItem } from 'src/app/models/check-item';
import { AppStateService } from 'src/app/services/app-state.service';

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

  checkId: number;

  colors = ['#B7ADEF', '#FAB0B0', '#FACD85', '#75DE91', '#EE8AF2', '#74D9CE'];

  editMode = false;

  faPlus = faPlus;

  faTrash = faTrash;

  items: ItemDebts[];

  participants: ParticipantDebt[] = [];

  personalItems: PersonalItem[];

  checkInfoSubscription$: Subscription;

  debtsSubscription$: Subscription;

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
  }

  ngOnDestroy() {
    this.debtsSubscription$.unsubscribe();
    if (this.checkInfoSubscription$) this.checkInfoSubscription$.unsubscribe();
  }

  isLoaded(): boolean {
    return !!this.appState.checkInfoSelected && !!this.personalItems;
  }

  private getParticipantColor(index: number) {
    return this.colors[index % this.colors.length];
  }

  private extractCheckItems() {
    if (!this.isLoaded()) return;

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

  private addSumToEachParticipant(sum: number) {
    this.participants.forEach(participant => participant.sum += sum);
  }

  private clearSum() {
    this.participants.forEach(participant => participant.sum = 0);
  }

}
