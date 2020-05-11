import { Check } from 'src/app/models/check';

export const CHECK_LIST_CREDIT: Check[] = [
  {
    id: 1,
    name: 'Лента',
    paidBy: 1,
    date: '2020-01-16T12:25:00.000Z',
    sumTotal: 181,
    sumIndividual: 181,
    status: 'accepted'
  },
  {
    id: 2,
    name: 'Лента',
    paidBy: 1,
    date: '2020-01-15T21:03:00.000Z',
    sumTotal: 1034,
    sumIndividual: 1034,
    status: 'accepted'
  },
  {
    id: 3,
    name: 'Очень длинное название',
    paidBy: 1,
    date: '2020-01-14T15:28:00.000Z',
    sumTotal: 12.35,
    sumIndividual: 12.35,
    status: 'accepted'
  },
  {
    id: 4,
    name: 'Теремок',
    paidBy: 1,
    date: '2020-01-12T18:20:00.000Z',
    sumTotal: 203,
    sumIndividual: 203,
    status: 'accepted'
  },
  {
    id: 5,
    name: 'Теремок',
    paidBy: 1,
    date: '2020-01-12T18:20:00.000Z',
    sumTotal: 213,
    sumIndividual: 213,
    status: 'canceled'
  },
  {
    id: 6,
    name: 'Лента',
    paidBy: 1,
    date: '2020-01-10T22:01:00.000Z',
    sumTotal: 366,
    sumIndividual: 366,
    status: 'accepted'
  },
  {
    id: 7,
    name: 'Лента',
    paidBy: 1,
    date: '2020-01-03T14:56:04.000Z',
    sumTotal: 964,
    sumIndividual: 964,
    status: 'closed'
  }
];
