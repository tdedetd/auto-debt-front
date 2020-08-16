import { Injectable } from "@angular/core";
import { CheckInfo } from '../models/check-info';
import { DebtTypes, DebtNormalizeTypes } from '../enums';

class SummaryScreenState {
  debtTypeSelected: DebtTypes;
  normalizeType: DebtNormalizeTypes;
}

@Injectable()
export class AppStateService {

  checkInfoSelected: CheckInfo;

  summaryScreen: SummaryScreenState;

  constructor() {
    this.summaryScreen = {
      debtTypeSelected: DebtTypes.Credit,
      normalizeType: DebtNormalizeTypes.Unnormalized
    }
  }
}
