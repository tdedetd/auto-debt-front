import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';
import { Subscription, Observable } from 'rxjs';

import { UserInfo } from 'src/app/models/user-info';
import { DebtSummaryItem } from 'src/app/models/debt-summary-item';
import { Action } from 'src/app/components';
import { ApiService, UserService, AppStateService } from 'src/app/services';
import { DebtNormalizeTypes, DebtTypes } from 'src/app/enums';

@Component({
  selector: 'ad-debt-summary',
  templateUrl: './debt-summary.component.html',
  styleUrls: ['./debt-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DebtSummaryComponent implements OnInit, OnDestroy {

  actions: Action[] = [
    {
      label: 'Перейти к чекам',
      icon: faList,
      callback: () => this.router.navigate(['check-list', this.appState.summaryScreen.debtTypeSelected])
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

  normalizedTypeSwitch: boolean;

  userInfo$: Observable<UserInfo>;

  summaryCreditSubscription: Subscription;
  summaryDebitSubscription: Subscription;

  constructor(private router: Router,
              private api: ApiService,
              private userService: UserService,
              public appState: AppStateService) { }

  ngOnInit() {
    this.normalizedTypeSwitch = this.appState.summaryScreen.normalizeType === DebtNormalizeTypes.Normalized;

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
  }

  onCheckNormalizeCheck(checked: boolean) {
    this.appState.summaryScreen.normalizeType = checked ? DebtNormalizeTypes.Normalized : DebtNormalizeTypes.Unnormalized;
  }

  onSummaryCardClick(debtType: DebtTypes) {
    this.appState.summaryScreen.debtTypeSelected = debtType;
  }

  onUserItemClick(userId: number) {
    this.router.navigate(['check-list', this.appState.summaryScreen.debtTypeSelected, userId]);
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
