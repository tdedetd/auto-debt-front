import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'ad-status-bar-top',
  templateUrl: './status-bar-top.component.html',
  styleUrls: ['./status-bar-top.component.css']
})
export class StatusBarTopComponent implements OnInit, OnDestroy {

  faChevronLeft = faChevronLeft;

  userInfo: UserInfo;

  userInfoSubscription: Subscription;

  constructor(private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.userInfoSubscription = this.userService.getUserInfo()
      .subscribe(userInfo => this.userInfo = userInfo);
  }

  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();
  }

  onBackButtonClick() {
    this.location.back();
  }

}
