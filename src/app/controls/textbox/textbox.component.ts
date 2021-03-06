import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ad-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TextboxComponent implements OnInit {

  @Input() placeholder: string;

  @Input() value: string;

  @Input() styles: object;

  @Input() maxLength: number;

  @Input() max: number;

  @Input() minLength: number;

  @Input() min: number;

  @Input() pattern: string;

  @Input() required = false;

  @Input() type = 'text';

  formControl: FormControl;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  @Output() valueInput: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    const validators =  [];

    if (this.required || typeof this.required === 'string') {
      validators.push(Validators.required);
    }

    if (this.minLength !== undefined) {
      validators.push(Validators.minLength(this.minLength));
    }

    if (this.pattern !== undefined) {
      validators.push(Validators.pattern(this.pattern));
    }

    if (this.maxLength !== undefined) {
      validators.push(Validators.maxLength(this.maxLength));
    }

    if (this.min !== undefined) {
      validators.push(Validators.min(this.min));
    }

    if (this.max !== undefined) {
      validators.push(Validators.max(this.max));
    }

    this.formControl = new FormControl(this.value, validators);
  }

  public getValue() {
    return this.value;
  }

  onInputChange(e) {
    this.value = e.target.value;
    this.valueChange.emit(this.value);
  }

  onInputModelChange(text: string) {
    this.valueInput.emit(text);
  }

}
