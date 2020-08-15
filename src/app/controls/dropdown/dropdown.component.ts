import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { DropdownItem } from 'src/app/models/dropdown-item';

@Component({
  selector: 'ad-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {

  @Input() items: DropdownItem[];

  @Input() styles: object;

  @Input() value: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectChange(value: any) {
    this.valueChange.emit(value);
  }

}
