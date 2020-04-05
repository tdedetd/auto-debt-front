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
      callback: () => console.log('Добавить пункт')
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

  constructor() { }

  ngOnInit() {
    this.initCheck();
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
  }

}
