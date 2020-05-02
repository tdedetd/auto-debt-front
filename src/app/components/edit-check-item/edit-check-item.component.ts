import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { faPencilAlt, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TextboxComponent } from '../../controls/textbox/textbox.component';

@Component({
  selector: 'ad-edit-check-item',
  templateUrl: './edit-check-item.component.html',
  styleUrls: ['./edit-check-item.component.css']
})
export class EditCheckItemComponent implements OnInit {

  @ViewChild('nameInput', { static: false }) nameInput: TextboxComponent;

  @ViewChild('countInput', { static: false }) countInput: TextboxComponent;

  @ViewChild('priceInput', { static: false }) priceInput: TextboxComponent;

  @Input() count: number;

  @Input() name: string;

  @Input() price: number;

  editMode = false;

  faPencilAlt = faPencilAlt;

  faCheck = faCheck;

  faTrash = faTrash;

  @Output() edited: EventEmitter<{ name: string, count: number, price: number }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEditIconClick() {
    this.editMode = !this.editMode;

    if (!this.editMode) {
      this.edited.emit({
        name: this.nameInput.getValue(),
        count: +this.countInput.getValue(),
        price: +this.priceInput.getValue()
      });
    }
  }

  onTextboxClick(e) {
    e.target.select();
  }

  updateDisplaySum() {
    this.count = +this.countInput.getValue();
    this.price = +this.priceInput.getValue();
  }

}
