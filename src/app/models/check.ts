import { CheckStatuses } from '../enums/check-statuses';

export class Check {
  id: number;
  name: string;
  paidBy: number;
  date: string;
  sumTotal: number;
  sumIndividual: number;
  status: CheckStatuses;
}
