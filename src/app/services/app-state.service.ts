import { Injectable } from "@angular/core";
import { CheckInfo } from '../models/check-info';

@Injectable()
export class AppStateService {
  checkInfoSelected: CheckInfo;
}
