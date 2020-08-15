import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ad-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  @Input() background: string;

  @Input() closable = false;

  @Input() styles: any;

  @Input() text: string;

  faTimes = faTimes;

  @Output() close: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onTimesClick() {
    this.close.emit();
  }

}
