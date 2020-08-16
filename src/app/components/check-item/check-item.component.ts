import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CheckStatuses } from 'src/app/enums';

const BADGE_STATUSES = [
  {
    status: CheckStatuses.Draft,
    text: 'ЧЕРНОВИК',
    background: '#f2c587',
    class: 'check-item_draft'
  },
  {
    status: CheckStatuses.Closed,
    text: 'ЗАКРЫТ',
    background: '#009908',
    class: 'check-item_closed'
  },
  {
    status: CheckStatuses.Canceled,
    text: 'ОТМЕНЕН',
    background: '#ff9090',
    class: 'check-item_canceled'
  }
];

@Component({
  selector: 'ad-check-item',
  templateUrl: './check-item.component.html',
  styleUrls: ['./check-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckItemComponent implements OnInit {

  @Input() id: number;

  @Input() name: string;

  @Input() date: string;

  @Input() sum: number;

  @Input() status: CheckStatuses;

  statusSettings;

  constructor() { }

  ngOnInit() {
    this.statusSettings = BADGE_STATUSES.find(item => item.status === this.status);
  }

}
