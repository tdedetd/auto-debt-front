import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PersonalItemDebt } from 'src/app/screens/edit-debt/edit-debt.component';

@Component({
  selector: 'ad-edit-debt-item-card',
  templateUrl: './edit-debt-item-card.component.html',
  styleUrls: ['./edit-debt-item-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditDebtItemCardComponent implements OnInit {

  @Input() count: number;

  @Input() editMode = false;

  @Input() name: string;

  @Input() personalItemsDebt: PersonalItemDebt[] = [];

  @Input() price: number;

  @Input() sum: number;

  faPlus = faPlus;

  partsSame: boolean;

  @Output() addPersonalItemClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.partsSame = this.checkPartsSame();
  }

  onAddParticipantClick() {
    this.addPersonalItemClick.emit();
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
