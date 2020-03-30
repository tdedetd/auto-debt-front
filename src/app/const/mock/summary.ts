import { DebtSummaryItem } from 'src/app/models/debt-summary-item';

export const SUMMARY_CREDIT: DebtSummaryItem[] = [
  {
    userId: 2,
    username: 'Алексей',
    sum: 919.52
  },
  {
    userId: 3,
    username: 'Сергей',
    sum: 702.31
  },
  {
    userId: 4,
    username: 'Александр',
    sum: 412.81
  }
];

export const SUMMARY_DEBIT: DebtSummaryItem[] = [
  {
    userId: 2,
    username: 'Алексей',
    sum: 830.23
  },
  {
    userId: 4,
    username: 'Александр',
    sum: 600
  }
];
