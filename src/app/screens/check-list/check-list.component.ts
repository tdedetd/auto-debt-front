import { Component, OnInit } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'ad-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {

  actions: Action[] = [
    {
      label: 'Фильтр',
      icon: faFilter,
      callback: () => console.log('filter')
    }
  ];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getChecksDebit({
      page: 0,
      count: 0,
      statuses: 'draft,accepted'
    }).subscribe();
  }

}
