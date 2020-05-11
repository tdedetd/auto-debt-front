import { CheckStatus } from '../types';

export class Check {
  id: number;
  name: string;
  paidBy: number;
  date: string;
  sumTotal: number;
  sumIndividual: number;
  status: CheckStatus;
}
