import { Component, OnInit } from '@angular/core';
import { faPlus, faSave, faFileImport, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { CheckInfo } from 'src/app/models/check-info';
import { ApiService } from 'src/app/services/api.service';
import { EditCheckItemCard } from 'src/app/models/edit-check-item-card';

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
      callback: () => this.importModalVisible = true
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

  onCardDelete(card: EditCheckItemCard) {
    this.cardSelected = card;
    this.deleteItemModalVisible = true;
  }

  onCheckItemEdited(e: { name: string, count: number, price: number }, card: EditCheckItemCard) {
    card.item.count = e.count;
    card.item.name = e.name;
    card.item.price = e.price;
    card.item.sum = card.item.price * card.item.count;
    card.editMode = false;

    this.updateCheckTotal();
  }

  onImportModalAccept() {
    this.api.importCheck({ fpd: '123', total: 123 })
      .subscribe(checkInfo => {
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
      name: null,
      address: null,
      fpd: null,
      sum: 0,
      date: '',
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
