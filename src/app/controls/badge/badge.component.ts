import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ad-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BadgeComponent implements OnInit {

  @Input() background: string;

  @Input() closable = false;

  @Input() styles: any;

  @Input() text: string;

  faTimes = faTimes;

  constructor() { }

  ngOnInit() {
  }

}
