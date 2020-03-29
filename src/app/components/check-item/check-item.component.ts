import { Component, OnInit, Input } from '@angular/core';

const BADGE_STATUSES = [
  {
    status: 'draft',
    text: 'ЧЕРНОВИК',
    background: '#f2c587'
  },
  {
    status: 'canceled',
    text: 'ОТМЕНЕН',
    background: '#ff9090'
  },
];

@Component({
  selector: 'ad-check-item',
  templateUrl: './check-item.component.html',
  styleUrls: ['./check-item.component.css']
})
export class CheckItemComponent implements OnInit {

  @Input() name: string;

  @Input() date: string;

  @Input() sum: number;

  @Input() status: 'draft' | 'accepted' | 'canceled';

  statusSettings;

  constructor() { }

  ngOnInit() {
    this.statusSettings = BADGE_STATUSES.find(item => item.status === this.status);
  }

}
