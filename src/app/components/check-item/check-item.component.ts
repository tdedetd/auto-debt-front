import { Component, OnInit, Input } from '@angular/core';
import { CheckStatus } from 'src/app/types';

const BADGE_STATUSES = [
  {
    status: 'draft',
    text: 'ЧЕРНОВИК',
    background: '#f2c587'
  },
  {
    status: 'closed',
    text: 'ЗАКРЫТ',
    background: '#009908'
  },
  {
    status: 'canceled',
    text: 'ОТМЕНЕН',
    background: '#ff9090'
  }
];

@Component({
  selector: 'ad-check-item',
  templateUrl: './check-item.component.html',
  styleUrls: ['./check-item.component.css']
})
export class CheckItemComponent implements OnInit {

  @Input() id: number;

  @Input() name: string;

  @Input() date: string;

  @Input() sum: number;

  @Input() status: CheckStatus;

  statusSettings;

  constructor() { }

  ngOnInit() {
    this.statusSettings = BADGE_STATUSES.find(item => item.status === this.status);
  }

}
