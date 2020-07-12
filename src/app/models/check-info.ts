import { CheckItem } from './check-item';

export class CheckInfo {
  id: number;
  name: string;
  address: string;
  fpd: string;
  sum: number;
  date: string;
  paidBy: number;
  items: CheckItem[];
}
