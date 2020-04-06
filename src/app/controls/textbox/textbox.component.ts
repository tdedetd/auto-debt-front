import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ad-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {

  @Input() placeholder: string;

  @Input() value: string;

  @Input() width: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onInputChange(e) {
    this.valueChange.emit(e.target.value);
  }

}
