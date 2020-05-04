import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilter, faLevelUpAlt, faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { ApiService } from 'src/app/services/api.service';
import { Check } from 'src/app/models/check';
import { DebtType, CheckStatus } from 'src/app/types';
import { UserInfo } from 'src/app/models/user-info';
import { GetChecksParams } from 'src/app/params/get-checks.params';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'ad-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit, OnDestroy {

  @ViewChild('filtersModal', { static: false }) filtersModal: ModalComponent;

  actions: Action[] = [
    {
      label: 'Фильтр',
      icon: faFilter,
      callback: () => this.showModal(this.filtersModal)
    }
  ];

  checks: Check[] = [];

  checksSubscriptions: Subscription[] = [];

  count = 20;

  debtType: DebtType;

  faLevelUpAlt = faLevelUpAlt;

  faLevelDownAlt = faLevelDownAlt;

  page = 0;

  selectedStatuses: CheckStatus[] = ['draft', 'accepted', 'canceled'];

  userId: number;

  userInfo$: Observable<UserInfo>;

  constructor(private activatedRoute: ActivatedRoute,
              private api: ApiService) { }

  ngOnInit() {
    this.debtType = this.activatedRoute.snapshot.data.debtType;
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.loadChecks();

    if (this.userId !== undefined) {
      this.userInfo$ = this.api.getUsers({ id: this.userId })
        .pipe(map(users => {
          if (users.length === 0) return {
            id: 0,
            username: 'unknown user',
            avatar: '',
            isSuperuser: false
          };
          return users[0];
        }));
    }
  }

  ngOnDestroy() {
    this.checksSubscriptions.forEach(sub => sub.unsubscribe());
  }

  onFiltersModalAccept() {
    console.log('onFiltersModalAccept');
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
  }

  private showModal(modal: ModalComponent) {
    modal.show();
  }

}
