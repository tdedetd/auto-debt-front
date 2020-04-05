import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { DebtType, DebtNormalizeType } from 'src/app/types';
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/models/user-info';
import { DebtSummaryItem } from 'src/app/models/debt-summary-item';

@Component({
  selector: 'ad-debt-summary',
  templateUrl: './debt-summary.component.html',
  styleUrls: ['./debt-summary.component.css']
})
export class DebtSummaryComponent implements OnInit, OnDestroy {

  debtSum = {
    normalized: {
      credit: 0,
      debit: 0
    },
    unnormalized: {
      credit: 0,
      debit: 0
    }
  }

  userItems: {
    normalized: {
      credit: DebtSummaryItem[],
      debit: DebtSummaryItem[]
    },
    unnormalized: {
      credit: DebtSummaryItem[],
      debit: DebtSummaryItem[]
    }
  } = {
    normalized: {
      credit: [],
      debit: []
    },
    unnormalized: {
      credit: [],
      debit: []
    }
  };

  selectedType: DebtType = 'credit';

  normalizeType: DebtNormalizeType = 'unnormalized';

  userInfo: UserInfo;

  summaryCreditSubscription: Subscription;
  summaryDebitSubscription: Subscription;
  userInfoSubscription: Subscription;

  constructor(private router: Router,
              private api: ApiService,
              private userService: UserService) { }

  ngOnInit() {
    this.summaryCreditSubscription = this.api.getSummaryCredit()
      .subscribe(debtItems => {
        this.debtSum.unnormalized.credit = debtItems.reduce((add, item) => add + item.sum, 0);
        this.userItems.unnormalized.credit = debtItems;
      });

    this.summaryDebitSubscription = this.api.getSummaryDebit()
      .subscribe(debtItems => {
        this.debtSum.unnormalized.debit = debtItems.reduce((add, item) => add + item.sum, 0);
        this.userItems.unnormalized.debit = debtItems;
      });

    this.userInfoSubscription = this.userService.getUserInfo()
      .subscribe(userInfo => this.userInfo = userInfo);
  }

  ngOnDestroy() {
    this.summaryCreditSubscription.unsubscribe();
    this.summaryDebitSubscription.unsubscribe();
    this.userInfoSubscription.unsubscribe();
  }

  onCheckNormalizeCheck(checked: boolean) {
    this.normalizeType = checked ? 'normalized' : 'unnormalized';
  }

  onSummaryCardClick(debtType: DebtType) {
    if (this.selectedType === debtType) {
      this.router.navigate(['check-list', this.selectedType]);
    } else {
      this.selectedType = debtType;
    }
  }

}
