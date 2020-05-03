import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CHECK_LIST_CREDIT } from '../const/mock/check-list-credit';
import { CHECK_LIST_DEBIT } from '../const/mock/check-list-debit';
import { SUMMARY_CREDIT, SUMMARY_DEBIT } from '../const/mock/summary';
import { USER_INFO } from '../const/mock/user-info';
import { USERS_FIRST } from '../const/mock/users-first';
import { CHECK_PARSE } from '../const/mock/check-parse';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  private readonly apiUrl = environment.apiUrl;

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.url === this.apiUrl + '/auth/me') {
      return this.response(req, USER_INFO);
    }

    if (req.url === this.apiUrl + '/api/users') {
      return this.response(req, USERS_FIRST);
    }

    if (req.url === this.apiUrl + '/api/checks/credit') {
      return this.response(req, CHECK_LIST_CREDIT);
    }

    if (req.url === this.apiUrl + '/api/checks/debit') {
      return this.response(req, CHECK_LIST_DEBIT);
    }

    if (req.url === this.apiUrl + '/api/checks/import') {
      return this.response(req, CHECK_PARSE);
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
}
