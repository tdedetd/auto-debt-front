import { Component, OnInit, ViewChild } from '@angular/core';
import { faPlus, faSave, faList, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { CheckInfo } from 'src/app/models/check-info';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { CheckItem } from 'src/app/models/check-item';

@Component({
  selector: 'ad-edit-check',
  templateUrl: './edit-check.component.html',
  styleUrls: ['./edit-check.component.css']
})
export class EditCheckComponent implements OnInit {

  @ViewChild('importModal', { static: false }) importModal: ModalComponent;

  @ViewChild('resetModal', { static: false }) resetModal: ModalComponent;

  @ViewChild('saveModal', { static: false }) saveModal: ModalComponent;

  actions: Action[] = [
    {
      label: 'Добавить пункт',
      icon: faPlus,
      callback: () => this.addItem()
    },
    {
      label: 'Импорт',
      icon: faList,
      callback: () => this.showModal(this.importModal)
    },
    {
      label: 'Очистить',
      icon: faTimesCircle,
      callback: () => this.showModal(this.resetModal)
    },
    {
      label: 'Сохранить',
      icon: faSave,
      callback: () => this.showModal(this.saveModal)
    }
  ];

  checkInfo: CheckInfo;

  checkTotal = 0;

  constructor() { }

  ngOnInit() {
    this.initCheck();
  }

  onCheckItemEdited(e: { name: string, count: number, price: number }, item: CheckItem) {
    item.count = e.count;
    item.name = e.name;
    item.price = e.price;
    item.sum = item.price * item.count;

    this.updateCheckTotal();
  }

  onImportModalAccept() {
    console.log('onImportModalAccept');
  }

  onResetModalAccept() {
    this.initCheck();
  }

  onSaveModalAccept() {
    console.log('saved');
  }

  private addItem() {
    this.checkInfo.items.push({
      name: 'Товар ' + (this.checkInfo.items.length + 1),
      count: 0,
      price: 0,
      sum: 0
    });
    this.updateCheckTotal();
    this.scrollToBottom();
  }

  private showModal(modal: ModalComponent) {
    modal.show();
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
    this.updateCheckTotal();
  }

  private scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  private updateCheckTotal() {
    this.checkTotal = this.checkInfo.items.reduce((add, item) => add + item.sum, 0);
  }

}
