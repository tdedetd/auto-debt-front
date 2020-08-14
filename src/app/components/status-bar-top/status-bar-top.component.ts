import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'ad-status-bar-top',
  templateUrl: './status-bar-top.component.html',
  styleUrls: ['./status-bar-top.component.css']
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
