import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private api: ApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(tap(e => {
      if (e instanceof HttpResponse) {
        if (e.status === 401) {
          this.api.toAuth();
        }
      }
    }));
  }
}
