import { Component, OnInit } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';

@Component({
  selector: 'ad-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {

  actions: Action[] = [
    {
      label: 'Фильтр',
      icon: faFilter,
      callback: () => console.log('filter')
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
