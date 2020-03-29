import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetChecksParams } from '../params/get-checks.params';
import { Check } from '../models/check';

@Injectable()
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getChecksCredit(params: GetChecksParams): Observable<Check[]> {
    return this.get(this.apiUrl + '/api/checks/credit', params);
  }

  public getChecksDebit(params: GetChecksParams): Observable<Check[]> {
    return this.get(this.apiUrl + '/api/checks/debit', params);
  }

  private get(url: string, params: any): Observable<any> {
    return this.http.get(url, { params });
  }
}
