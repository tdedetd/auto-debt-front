import { CheckDebts } from 'src/app/models/check-debts';

export const CHECK_DEBTS: CheckDebts = {
  participants: [
    {
      userId: 1,
      username: 'Дмитрий',
      isPaidBack: false
    },
    {
      userId: 2,
      username: 'Алексей',
      isPaidBack: false
    },
    {
      userId: 3,
      username: 'Сергей',
      isPaidBack: false
    },
    {
      userId: 4,
      username: 'Александр',
      isPaidBack: false
    }
  ],
  personalItems: [
    {
      itemId: 2,
      userId: 1,
      part: 1
    },
    {
      itemId: 6,
      userId: 1,
      part: 1
    },
    {
      itemId: 6,
      userId: 2,
      part: 2
    },
    {
      itemId: 7,
      userId: 2,
      part: 1
    },
    {
      itemId: 9,
      userId: 4,
      part: 1
    },
    {
      itemId: 10,
      userId: 1,
      part: 1
    },
    {
      itemId: 19,
      userId: 2,
      part: 1
    },
    {
      itemId: 19,
      userId: 3,
      part: 1
    },
    {
      itemId: 19,
      userId: 4,
      part: 1
    }
  ]
}
