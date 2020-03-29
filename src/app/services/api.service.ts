import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetChecksParams } from '../models/get-checks.params';

@Injectable()
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getChecksDebit(params: GetChecksParams): Observable<any> {
    return this.get(this.apiUrl + '/api/checks/debit/', params);
  }

  private get(url: string, params: any): Observable<any> {
    return this.http.get(url, { params });
  }
}
