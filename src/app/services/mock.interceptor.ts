import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CHECK_LIST_DEBIT } from '../const/mock/check-list-debit';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  private readonly apiUrl = environment.apiUrl;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === this.apiUrl + '/api/checks/debit/') {
      return this.response(req, CHECK_LIST_DEBIT);
    }
    return next.handle(req);
  }

  private response(req, data) {
    console.log(`${req.method} ${req.urlWithParams}\nRESPONSE`, data);
    return of(data);
  }
}
