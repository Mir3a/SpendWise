import type { Expense } from '@/types';

export const expenses: Expense[] = [
  {
    id: 'expense-001',
    name: 'Grocery shopping at Bingo',
    amount: 78.45,
    category: 'Groceries',
    date: '2026-11-07',
    description: 'Weekly groceries: bread, milk, eggs, vegetables, and chicken.',
    photoUrl: 'https://picsum.photos/seed/groceries/600/400',
  },
  {
    id: 'expense-002',
    name: 'Fuel at Hifa Petrol',
    amount: 60,
    category: 'Transport',
    date: '2026-11-06',
    description: 'Fuel for commuting and weekend errands in Sarajevo.',
    photoUrl: 'https://picsum.photos/seed/fuel/600/400',
  },
  {
    id: 'expense-003',
    name: 'Coffee at a Sarajevo café',
    amount: 3.5,
    category: 'Food',
    date: '2026-11-05',
    description: 'Afternoon coffee in Baščaršija.',
    photoUrl: 'https://picsum.photos/seed/coffee/600/400',
  },
  {
    id: 'expense-004',
    name: 'Monthly internet bill',
    amount: 45.9,
    category: 'Bills',
    date: '2026-11-04',
    description: 'Home internet subscription for November.',
    photoUrl: 'https://picsum.photos/seed/internet/600/400',
  },
  {
    id: 'expense-005',
    name: 'Clothing at SCC',
    amount: 89.95,
    category: 'Shopping',
    date: '2026-11-03',
    description: 'Jeans and a sweater from Sarajevo City Center.',
    photoUrl: 'https://picsum.photos/seed/clothing/600/400',
  },
];
