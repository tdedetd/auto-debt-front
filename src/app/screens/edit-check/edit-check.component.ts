import { Component, OnInit } from '@angular/core';
import { faPlus, faSave, faFileImport, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { CheckInfo } from 'src/app/models/check-info';
import { EditCheckItemCard } from 'src/app/models/edit-check-item-card';
import { CheckItem } from 'src/app/models/check-item';
import { ImportCheckParams } from 'src/app/params/import-check.params';
import { Action } from 'src/app/components';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'ad-edit-check',
  templateUrl: './edit-check.component.html',
  styleUrls: ['./edit-check.component.css']
})
export class EditCheckComponent implements OnInit {

  actions: Action[] = [
    {
      label: 'Добавить пункт',
      icon: faPlus,
      callback: () => this.addItem()
    },
    {
      label: 'Импорт',
      icon: faFileImport,
      callback: () => {
        this.importCheckForm = { fpd: null, total: 0 };
        this.importModalVisible = true;
      }
    },
    {
      label: 'Очистить',
      icon: faTimesCircle,
      callback: () => this.resetModalVisible = true
    },
    {
      label: 'Сохранить',
      icon: faSave,
      callback: () => this.saveModalVisible = true
    }
  ];

  deleteItemModalVisible = false;

  importModalVisible = false;

  importCheckForm: ImportCheckParams = { fpd: null, total: 0 };

  importCheckLoading: boolean;

  resetModalVisible = false;

  saveModalVisible = false;

  checkInfo: CheckInfo;

  cardSelected: EditCheckItemCard;

  itemCards: EditCheckItemCard[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.initCheck();
  }

  deleteSelectedCard() {
    const index = this.itemCards.indexOf(this.cardSelected);
    this.itemCards.splice(index, 1);
    this.updateCheckTotal();
  }

  editedCardsExist() {
    return this.itemCards.filter(card => card.editMode).length > 0;
  }

  onCardDelete(card: EditCheckItemCard) {
    this.cardSelected = card;
    this.deleteItemModalVisible = true;
  }

  onCheckItemEdited(item: CheckItem, card: EditCheckItemCard) {
    card.item = item;
    this.updateCheckTotal();
  }

  onImportModalAccept() {
    this.importCheckLoading = true;
    this.api.importCheck(this.importCheckForm)
      .subscribe(checkInfo => {
        this.importCheckLoading = false;
        this.checkInfo = checkInfo;
        this.itemCards = this.checkInfo.items.map(item => ({ editMode: false, item }));
        this.updateCheckTotal();
        this.importModalVisible = false;
      });
  }

  onResetModalAccept() {
    this.initCheck();
  }

  onSaveModalAccept() {
    this.checkInfo.items = this.itemCards.map(card => card.item);
    console.log('saved', this.checkInfo);
  }

  private addItem() {
    this.itemCards.push({
      editMode: true,
      item: {
        id: null,
        name: 'Товар ' + (this.itemCards.length + 1),
        count: 0,
        price: 0,
        sum: 0
      }
    });
    this.updateCheckTotal();
    this.scrollToBottom();
  }

  private initCheck() {
    this.checkInfo = {
      id: null,
      name: null,
      address: null,
      fpd: null,
      sum: 0,
      date: '',
      paidBy: null,
      items: []
    };
    this.itemCards = [];
    this.updateCheckTotal();
  }

  private scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  private updateCheckTotal() {
    this.checkInfo.sum = this.itemCards.reduce((add, card) => add + card.item.sum, 0);
  }

}
