import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ad-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  @Input() acceptable = true;

  @Input() mode: 'alert' | 'confirm';

  @Input() title: string;

  @Input() preventHideOnAccept = false;

  @Input() visible = false;

  faCheck = faCheck;

  faTimes = faTimes;

  @Output() accept: EventEmitter<void> = new EventEmitter();

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAcceptClick() {
    if (!this.preventHideOnAccept) this.hide();
    this.accept.emit();
  }

  public hide() {
    this.visibleChange.emit(false);
  }

  @HostListener('document:keydown', ['$event'])
  private onKeyDown(e) {
    if (e.keyCode === 27) {
      this.visibleChange.emit(false);
    }
  }

}
