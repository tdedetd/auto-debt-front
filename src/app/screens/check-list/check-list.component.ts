import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilter, faLevelUpAlt, faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription, Observable } from 'rxjs';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { ApiService } from 'src/app/services/api.service';
import { Check } from 'src/app/models/check';
import { DebtType, CheckStatus } from 'src/app/types';
import { UserInfo } from 'src/app/models/user-info';
import { GetChecksParams } from 'src/app/params/get-checks.params';

@Component({
  selector: 'ad-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit, OnDestroy {

  actions: Action[] = [
    {
      label: 'Фильтр',
      icon: faFilter,
      callback: () => this.filtersModalVisible = true
    }
  ];

  checks: Check[] = [];

  checkedShowCanceled = true;

  checkedShowDraft = true;

  checkedShowClosed = false;

  debtType: DebtType;

  faLevelUpAlt = faLevelUpAlt;

  faLevelDownAlt = faLevelDownAlt;

  filtersModalVisible = false;

  userId: number;

  userInfo$: Observable<UserInfo>;

  private checksSubscriptions: Subscription[] = [];

  private count = 20;

  private page = 0;

  private selectedStatuses: CheckStatus[] = ['draft', 'accepted', 'canceled'];

  constructor(private activatedRoute: ActivatedRoute,
              private api: ApiService) { }

  ngOnInit() {
    this.debtType = this.activatedRoute.snapshot.data.debtType;
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.updateSelectedStatuses();
    this.resetChecks();

    if (this.userId !== undefined) {
      this.userInfo$ = this.api.getUser(this.userId);
    }
  }

  ngOnDestroy() {
    this.checksSubscriptions.forEach(sub => sub.unsubscribe());
  }

  onFiltersModalAccept() {
    this.updateSelectedStatuses();
    this.resetChecks();
  }

  onMoreButtonClick() {
    this.loadChecks();
  }

  private loadChecks() {
    let params: GetChecksParams = {
      page: this.page,
      count: this.count,
      statuses: this.selectedStatuses.join(',')
    };

    if (this.userId) {
      params = { ...params, userId: this.userId };
    }

    const checkObs = this.debtType === 'credit' ?
      this.api.getChecksCredit(params) :
      this.api.getChecksDebit(params);

    const subscription = checkObs.subscribe(data => this.checks.push(...data));
    this.checksSubscriptions.push(subscription);
    this.page++;
  }

  private resetChecks() {
    this.page = 0;
    this.checks = [];
    this.loadChecks();
  }

  private updateSelectedStatuses() {
    this.selectedStatuses = ['accepted'];

    if (this.checkedShowDraft) this.selectedStatuses.push('draft');
    if (this.checkedShowCanceled) this.selectedStatuses.push('canceled');
    if (this.checkedShowClosed) this.selectedStatuses.push('closed');
  }

}
