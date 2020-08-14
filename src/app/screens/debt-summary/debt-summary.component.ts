import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';
import { Subscription, Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { DebtType, DebtNormalizeType } from 'src/app/types';
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/models/user-info';
import { DebtSummaryItem } from 'src/app/models/debt-summary-item';
import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';

@Component({
  selector: 'ad-debt-summary',
  templateUrl: './debt-summary.component.html',
  styleUrls: ['./debt-summary.component.css']
})
export class DebtSummaryComponent implements OnInit, OnDestroy {

  actions: Action[] = [
    {
      label: 'Перейти к чекам',
      icon: faList,
      callback: () => this.router.navigate(['check-list', this.selectedType])
    },
    {
      label: 'Добавить чек',
      icon: faPlus,
      callback: () => this.navigateToEditCheck()
    }
  ];

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

  userInfo$: Observable<UserInfo>;

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

    this.userInfo$ = this.userService.getUserInfo();
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
    this.selectedType = debtType;
  }

  onUserItemClick(userId: number) {
    this.router.navigate(['check-list', this.selectedType, userId]);
  }

  private navigateToEditCheck() {
    this.router.navigate(['edit-check']);
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
