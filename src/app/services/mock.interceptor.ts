import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CHECK_LIST_CREDIT } from '../const/mock/check-list-credit';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  private readonly apiUrl = environment.apiUrl;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === this.apiUrl + '/api/checks/credit/') {
      return this.response(req, CHECK_LIST_CREDIT);
    }
    return next.handle(req);
  }

  private response(req, data) {
    console.log(`${req.method} ${req.urlWithParams}\nRESPONSE`, data);
    return of(data);
  }
}
