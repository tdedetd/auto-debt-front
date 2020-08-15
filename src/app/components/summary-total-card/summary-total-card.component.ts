import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ad-summary-total-card',
  templateUrl: './summary-total-card.component.html',
  styleUrls: ['./summary-total-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SummaryTotalCardComponent implements OnInit {

  @Input() debt: number;

  @Input() username: string;

  faRubleSign = faRubleSign;

  constructor() { }

  ngOnInit() {
  }

}
