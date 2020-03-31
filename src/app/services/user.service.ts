import { Injectable } from "@angular/core";
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserInfo } from '../models/user-info';
import { ApiService } from './api.service';

@Injectable()
export class UserService {

  private userInfo: UserInfo;

  constructor(private api: ApiService) { }

  getUserInfo(): Observable<UserInfo> {
    if (this.userInfo) return of(this.userInfo);

    return this.api.getUserInfo()
      .pipe(tap(userInfo => this.userInfo = userInfo));
  }
}
