import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GetChecksParams } from '../params/get-checks.params';
import { Check } from '../models/check';
import { DebtSummaryItem } from '../models/debt-summary-item';
import { UserInfo } from '../models/user-info';
import { GetUsersParams } from '../params/get-users.params';
import { ImportCheckParams } from '../params/import-check.params';
import { CheckInfo } from '../models/check-info';
import { CheckDebts } from '../models/check-debts';
import { DebtTypes } from '../enums';

@Injectable()
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public toAuth(): void {
    document.location.href = this.apiUrl + '/auth/page';
  }

  public getUserInfo(): Observable<UserInfo> {
    return this.get(this.apiUrl + '/auth/me', {});
  }

  public getUsers(params: GetUsersParams): Observable<UserInfo[]> {
    return this.get(this.apiUrl + '/api/users', params);
  }

  public getUser(userId: number): Observable<UserInfo> {
    return this.get(`${this.apiUrl}/api/users/${userId}`, {});
  }

  public getChecks(debtType: DebtTypes, params: GetChecksParams): Observable<Check[]> {
    return this.get(`${this.apiUrl}/api/checks/${debtType}`, params);
  }

  public importCheck(params: ImportCheckParams): Observable<CheckInfo> {
    return this.get(this.apiUrl + '/api/checks/import', params);
  }

  public getCheckInfo(checkId: number): Observable<CheckInfo> {
    return this.get(`${this.apiUrl}/api/checks/${checkId}`, {});
  }

  public getCheckDebts(checkId: number): Observable<CheckDebts> {
    return this.get(`${this.apiUrl}/api/checks/${checkId}/debts`, {});
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
