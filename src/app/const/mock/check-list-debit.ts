import { Check } from 'src/app/models/check';
import { CheckStatuses } from 'src/app/enums/check-statuses';

export const CHECK_LIST_DEBIT: Check[] = [
  {
    id: 122,
    name: 'Лента',
    paidBy: 1,
    date: '2019-12-19T17:12:00.000Z',
    sumTotal: 181,
    sumIndividual: 181,
    status: CheckStatuses.Draft
  },
  {
    id: 123,
    name: 'Лента',
    paidBy: 1,
    date: '2019-12-18T20:24:00.000Z',
    sumTotal: 1034,
    sumIndividual: 1034,
    status: CheckStatuses.Accepted
  },
  {
    id: 124,
    name: 'ОКЕЙ',
    paidBy: 1,
    date: '2019-12-16T18:30:00.000Z',
    sumTotal: 431.31,
    sumIndividual: 431.31,
    status: CheckStatuses.Accepted
  },
  {
    id: 125,
    name: 'ОКЕЙ',
    paidBy: 1,
    date: '2019-12-16T18:30:00.000Z',
    sumTotal: 431.31,
    sumIndividual: 431.31,
    status: CheckStatuses.Canceled
  },
  {
    id: 1012,
    name: 'telepizza',
    paidBy: 1,
    date: '2019-12-13T22:29:00.000Z',
    sumTotal: 213,
    sumIndividual: 213,
    status: CheckStatuses.Accepted
  },
  {
    id: 216,
    name: 'Лента',
    paidBy: 1,
    date: '2019-12-11T20:19:00.000Z',
    sumTotal: 366,
    sumIndividual: 366,
    status: CheckStatuses.Accepted
  },
  {
    id: 366,
    name: 'Лента',
    paidBy: 1,
    date: '2019-12-10T19:21:00.000Z',
    sumTotal: 366,
    sumIndividual: 366,
    status: CheckStatuses.Accepted
  }
];
