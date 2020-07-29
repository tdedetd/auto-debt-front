import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DropdownItem } from 'src/app/models/dropdown-item';

@Component({
  selector: 'ad-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() items: DropdownItem[];

  @Input() styles: object;

  @Input() value: DropdownItem;

  @Output() valueChange: EventEmitter<DropdownItem> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
