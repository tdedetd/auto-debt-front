import { Component, OnInit } from '@angular/core';
import { faPlus, faSave, faList, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { CheckInfo } from 'src/app/models/check-info';

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
      icon: faList,
      callback: () => console.log('Импорт')
    },
    {
      label: 'Очистить',
      icon: faTimesCircle,
      callback: () => console.log('Очистить')
    },
    {
      label: 'Сохранить',
      icon: faSave,
      callback: () => console.log('Сохранить')
    }
  ];

  checkInfo: CheckInfo;

  checkTotal = 0;

  constructor() { }

  ngOnInit() {
    this.initCheck();
  }

  private addItem() {
    this.checkInfo.items.push({
      name: 'test',
      count: 1.21,
      price: 49.99,
      sum: 60.39
    });
    this.updateCheckTotal();
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

  private updateCheckTotal() {
    this.checkTotal = this.checkInfo.items.reduce((add, item) => add + item.sum, 0);
  }

}
