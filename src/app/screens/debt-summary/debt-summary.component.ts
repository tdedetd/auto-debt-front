import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { DebtType } from 'src/app/types';

@Component({
  selector: 'ad-debt-summary',
  templateUrl: './debt-summary.component.html',
  styleUrls: ['./debt-summary.component.css']
})
export class DebtSummaryComponent implements OnInit, OnDestroy {

  creditSum = 0;

  debitSum = 0;

  selectedType: DebtType = 'credit';

  summaryCreditSubscription: Subscription;

  summaryDebitSubscription: Subscription;

  constructor(private router: Router,
              private api: ApiService) { }

  ngOnInit() {
    this.summaryCreditSubscription = this.api.getSummaryCredit()
      .subscribe(debtItems => {
        this.creditSum = debtItems.reduce((add, item) => add + item.sum, 0);
      });

    this.summaryDebitSubscription = this.api.getSummaryDebit()
      .subscribe(debtItems => {
        this.debitSum = debtItems.reduce((add, item) => add + item.sum, 0)
      });
  }

  ngOnDestroy() {
    this.summaryCreditSubscription.unsubscribe();
    this.summaryDebitSubscription.unsubscribe();
  }

  onSummaryCardClick(debtType: DebtType) {
    if (this.selectedType === debtType) {
      this.router.navigate(['check-list', this.selectedType]);
    } else {
      this.selectedType = debtType;
    }
  }

}
