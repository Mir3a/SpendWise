export type ExpenseCategory =
  | 'Groceries'
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Other';

export type Expense = {
  id: string;
  name: string;
  /** Amount in BAM (KM). */
  amount: number;
  category: ExpenseCategory;
  /** Calendar date in YYYY-MM-DD format. */
  date: string;
  description?: string;
  /** Placeholder image for the expense card. */
  photoUrl: string;
  /** Actual receipt photograph, when available. */
  receiptPhotoUrl?: string;
};
