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
        this.updateNormalizedDebt();
      });

    this.summaryDebitSubscription = this.api.getSummaryDebit()
      .subscribe(debtItems => {
        this.debtSum.unnormalized.debit = debtItems.reduce((add, item) => add + item.sum, 0);
        this.userItems.unnormalized.debit = debtItems;
        this.updateNormalizedDebt();
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

  private updateNormalizedDebt() {
    const usersCredit = this.userItems.unnormalized.credit;
    const usersDebit = this.userItems.unnormalized.debit;
    const normalizedUsersCredit: DebtSummaryItem[] = [];
    const normalizedUsersDebit: DebtSummaryItem[] = [];

    const repeatingUsersCredit = usersCredit.filter(debtItemCredit => {
      return !!usersDebit.find(debtItemDebit => debtItemDebit.userId === debtItemCredit.userId);
    });

    normalizedUsersCredit.push(...usersCredit.filter(debtItemCredit => {
      return !usersDebit.find(debtItemDebit => debtItemDebit.userId === debtItemCredit.userId);
    }));

    normalizedUsersDebit.push(...usersDebit.filter(debtItemDebit => {
      return !usersCredit.find(debtItemCredit => debtItemCredit.userId === debtItemDebit.userId);
    }));

    repeatingUsersCredit.forEach(debtItemCredit => {
      const debtItemDebit = usersDebit.find(debtItemDebit => debtItemDebit.userId === debtItemCredit.userId);
      if (debtItemCredit.sum > debtItemDebit.sum) {
        normalizedUsersCredit.push({
          userId: debtItemCredit.userId,
          username: debtItemCredit.username,
          sum: debtItemCredit.sum - debtItemDebit.sum
        });
      } else {
        normalizedUsersDebit.push({
          userId: debtItemDebit.userId,
          username: debtItemDebit.username,
          sum: debtItemDebit.sum - debtItemCredit.sum
        });
      }
    });

    this.debtSum.normalized.credit = normalizedUsersCredit.reduce((add, item) => add + item.sum, 0);
    this.debtSum.normalized.debit = normalizedUsersDebit.reduce((add, item) => add + item.sum, 0);

    this.userItems.normalized.credit = normalizedUsersCredit.sort((a, b) => b.sum - a.sum);
    this.userItems.normalized.debit = normalizedUsersDebit.sort((a, b) => b.sum - a.sum);
  }

}
