export class Check {
  id: number;
  name: string;
  paidBy: number;
  date: string;
  sumTotal: number;
  sumInduvidual: number;
  status: 'draft' | 'accepted' | 'canceled';
}
