import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { faLevelUpAlt, faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ad-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SummaryCardComponent implements OnInit {

  @Input() isActive = false;

  @Input() sum: number;

  @Input() type: 'credit' | 'debit';

  faLevelUpAlt = faLevelUpAlt;

  faLevelDownAlt = faLevelDownAlt;

  constructor() { }

  ngOnInit() {
  }

}
