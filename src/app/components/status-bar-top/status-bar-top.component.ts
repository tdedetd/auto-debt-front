import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { UserInfo } from 'src/app/models/user-info';
import { UserService } from 'src/app/services';

@Component({
  selector: 'ad-status-bar-top',
  templateUrl: './status-bar-top.component.html',
  styleUrls: ['./status-bar-top.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatusBarTopComponent implements OnInit {

  faChevronLeft = faChevronLeft;

  userInfo$: Observable<UserInfo>;

  constructor(private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.userInfo$ = this.userService.getUserInfo();
  }

  onBackButtonClick() {
    this.location.back();
  }

}
