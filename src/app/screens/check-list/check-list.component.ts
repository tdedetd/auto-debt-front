import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { ApiService } from 'src/app/services/api.service';
import { Check } from 'src/app/models/check';
import { DebtType, CheckStatus } from 'src/app/types';

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
      callback: () => console.log('filter')
    }
  ];

  checks: Check[] = [];

  checksSubscriptions: Subscription[] = [];

  count = 20;

  page = 0;

  selectedStatuses: CheckStatus[] = ['draft', 'accepted', 'canceled'];

  selectedType: DebtType;

  constructor(private activatedRoute: ActivatedRoute,
              private api: ApiService) { }

  ngOnInit() {
    this.selectedType = this.activatedRoute.snapshot.params.debtType;
    this.loadChecks();
  }

  ngOnDestroy() {
    this.checksSubscriptions.forEach(sub => sub.unsubscribe());
  }

  onMoreButtonClick() {
    this.loadChecks();
  }

  private loadChecks() {
    const params = {
      page: this.page,
      count: this.count,
      statuses: this.selectedStatuses.join(',')
    };

    const checkObs = this.selectedType === 'credit' ?
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

}
