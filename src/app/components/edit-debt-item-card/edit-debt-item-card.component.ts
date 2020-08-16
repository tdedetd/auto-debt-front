import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PersonalItemDebt } from 'src/app/screens';

@Component({
  selector: 'ad-edit-debt-item-card',
  templateUrl: './edit-debt-item-card.component.html',
  styleUrls: ['./edit-debt-item-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditDebtItemCardComponent implements OnInit, AfterContentChecked {

  @Input() count: number;

  @Input() editMode = false;

  @Input() name: string;

  @Input() personalItemsDebt: PersonalItemDebt[] = [];

  @Input() price: number;

  @Input() sum: number;

  faPlus = faPlus;

  partsSame: boolean;

  @Output() addPersonalItemClick: EventEmitter<any> = new EventEmitter();

  @Output() removePersonalItem: EventEmitter<PersonalItemDebt> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.partsSame = this.checkPartsSame();
  }

  onAddParticipantClick() {
    this.addPersonalItemClick.emit();
  }

  onBadgeClose(personalItemDebt: PersonalItemDebt) {
    this.removePersonalItem.emit(personalItemDebt);
  }

  private checkPartsSame(): boolean {
    if (this.personalItemsDebt.length === 0) return true;
    const parts: number[] = this.personalItemsDebt.map(personalItem => personalItem.personalItem.part);
    const firstElem = parts[0];
    for (const partElem of parts) {
      if (partElem !== firstElem) return false;
    }
    return true;
  }

}
