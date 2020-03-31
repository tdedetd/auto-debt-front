import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetChecksParams } from '../params/get-checks.params';
import { Check } from '../models/check';
import { DebtSummaryItem } from '../models/debt-summary-item';
import { UserInfo } from '../models/user-info';

@Injectable()
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getProfileInfo(): Observable<UserInfo> {
    return this.get(this.apiUrl + '/auth/me', {});
  }

  public getChecksCredit(params: GetChecksParams): Observable<Check[]> {
    return this.get(this.apiUrl + '/api/checks/credit', params);
  }

  public getChecksDebit(params: GetChecksParams): Observable<Check[]> {
    return this.get(this.apiUrl + '/api/checks/debit', params);
  }

  public getSummaryCredit(): Observable<DebtSummaryItem[]> {
    return this.get(this.apiUrl + '/api/summary/credit', {});
  }

  public getSummaryDebit(): Observable<DebtSummaryItem[]> {
    return this.get(this.apiUrl + '/api/summary/debit', {});
  }

  private get(url: string, params: any): Observable<any> {
    return this.http.get(url, { params });
  }
}
