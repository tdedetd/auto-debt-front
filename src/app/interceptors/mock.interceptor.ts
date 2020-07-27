import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from '../../environments/environment';
import { CHECK_LIST_CREDIT } from '../const/mock/check-list-credit';
import { CHECK_LIST_DEBIT } from '../const/mock/check-list-debit';
import { SUMMARY_CREDIT, SUMMARY_DEBIT } from '../const/mock/summary';
import { USER_INFO } from '../const/mock/user-info';
import { USERS_FIRST } from '../const/mock/users-first';
import { CHECK_IMPORT } from '../const/mock/check-import';
import { CHECK_INFO } from '../const/mock/check-info';
import { CHECK_DEBTS } from '../const/mock/check-debts';
import { USERS_LIST } from '../const/mock/users-list';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  private readonly apiUrl = environment.apiUrl;

  private readonly GET_CHECK_INFO_REGEX = /api\/checks\/\d+$/;

  private readonly GET_CHECK_DEBTS_REGEX = /api\/checks\/\d+\/debts$/;

  private readonly GET_USER_REGEX = /api\/users\/\d+/;

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.url === this.apiUrl + '/auth/me') {
      return this.response(req, USER_INFO);
    }

    if (req.url === this.apiUrl + '/api/users') {
      const query = req.params.get('query').toLowerCase();
      if (!query) return this.empty();

      return this.response(req, USERS_LIST.filter(user => user.username.toLowerCase().indexOf(query) !== -1));
    }

    if (this.GET_USER_REGEX.test(req.url)) {
      return this.response(req, USERS_FIRST[0]);
    }

    if (req.url === this.apiUrl + '/api/checks/credit') {
      return this.response(req, CHECK_LIST_CREDIT);
    }

    if (req.url === this.apiUrl + '/api/checks/debit') {
      return this.response(req, CHECK_LIST_DEBIT);
    }

    if (req.url === this.apiUrl + '/api/checks/import') {
      return this.response(req, {...CHECK_IMPORT});
    }

    if (this.GET_CHECK_INFO_REGEX.test(req.url)) {
      return this.response(req, CHECK_INFO);
    }

    if (this.GET_CHECK_DEBTS_REGEX.test(req.url)) {
      return this.response(req, CHECK_DEBTS);
    }

    if (req.url === this.apiUrl + '/api/summary/credit') {
      return this.response(req, SUMMARY_CREDIT);
    }

    if (req.url === this.apiUrl + '/api/summary/debit') {
      return this.response(req, SUMMARY_DEBIT);
    }

    return next.handle(req);
  }

  private response(req, body) {
    console.log(`${req.method} ${req.urlWithParams}\nRESPONSE`, body);
    return of(new HttpResponse({ body }));
  }

  private empty() {
    return of(new HttpResponse({ body: [] }));
  }
}
