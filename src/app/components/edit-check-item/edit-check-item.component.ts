import { Component, OnInit, Input } from '@angular/core';
import { faPencilAlt, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CheckItem } from 'src/app/models/check-item';

@Component({
  selector: 'ad-edit-check-item',
  templateUrl: './edit-check-item.component.html',
  styleUrls: ['./edit-check-item.component.css']
})
export class EditCheckItemComponent implements OnInit {

  @Input() checkItem: CheckItem;

  isEdited = false;

  faPencilAlt = faPencilAlt;

  faCheck = faCheck;

  faTrash = faTrash;

  constructor() { }

  ngOnInit() {
  }

  onEditIconClick() {
    this.isEdited = !this.isEdited;
  }

}
