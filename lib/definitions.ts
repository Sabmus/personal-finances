import type { Transaction } from '@/db/models';

export interface IPath {
  name: string;
  url: string;
}

export interface IInputObject {
  id: string;
  name: string;
}

export type TAllTransactions = Omit<
  Transaction,
  'userId' | 'categoryId' | 'paymentMethodId' | 'updatedAt' | 'deletedAt'
> & { category: string | null; paymentMethod: string | null };
