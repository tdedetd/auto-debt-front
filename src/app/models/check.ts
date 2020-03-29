export class Check {
  id: number;
  name: string;
  date: string;
  sum: number;
  status: 'draft' | 'accepted' | 'canceled';
}
