import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ad-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {

  @Input() default = false;

  @Input() id: string;

  @Input() label: string;

  faCheck = faCheck;

  @Output() check = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.id) {
      this.id = String(Math.random()).split('.')[1];
    }
  }

  onCheckboxChange(e) {
    this.check.emit(e.target.checked);
  }

}
