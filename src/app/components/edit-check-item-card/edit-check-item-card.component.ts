import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { faPencilAlt, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TextboxComponent } from '../../controls/textbox/textbox.component';
import { CheckItem } from 'src/app/models/check-item';

@Component({
  selector: 'ad-edit-check-item-card',
  templateUrl: './edit-check-item-card.component.html',
  styleUrls: ['./edit-check-item-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditCheckItemCardComponent implements OnInit {

  @ViewChild('nameInput', { static: false }) nameInput: TextboxComponent;

  @ViewChild('countInput', { static: false }) countInput: TextboxComponent;

  @ViewChild('priceInput', { static: false }) priceInput: TextboxComponent;

  @Input() count: number;

  @Input() editMode = false;

  @Input() name: string;

  @Input() price: number;

  faPencilAlt = faPencilAlt;

  faCheck = faCheck;

  faTrash = faTrash;

  @Output() delete: EventEmitter<void> = new EventEmitter();

  @Output() edited: EventEmitter<CheckItem> = new EventEmitter();

  @Output() editModeChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDeleteButtonClick() {
    this.delete.emit();
  }

  onEditIconClick() {
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);

    if (!this.editMode) {
      this.edited.emit({
        id: null,
        name: this.nameInput.getValue(),
        count: +this.countInput.getValue(),
        price: +this.priceInput.getValue(),
        sum: this.count * this.price
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
