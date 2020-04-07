import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ad-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() mode: 'alert' | 'confirm';

  @Input() title: string;

  faCheck = faCheck;

  faTimes = faTimes;

  visible = false;

  @Output() accept: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAcceptClick() {
    this.accept.emit();
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

}
