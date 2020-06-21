import { Component, OnInit } from '@angular/core';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';

@Component({
  selector: 'ad-edit-debt',
  templateUrl: './edit-debt.component.html',
  styleUrls: ['./edit-debt.component.css']
})
export class EditDebtComponent implements OnInit {

  actions: Action[] = [
    
  ];

  constructor() { }

  ngOnInit() {
  }

}
