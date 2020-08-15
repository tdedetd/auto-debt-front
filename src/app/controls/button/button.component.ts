import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ad-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

  @Input() disabled = false;

  @Input() styles: object;

  @Output() clicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clicked.emit();
  }

}
