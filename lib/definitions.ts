import type { Transaction } from '@/db/models';

export interface IInputObject {
  id: string;
  name: string;
}

export type TAllTransactions = (Omit<
  Transaction,
  'userId' | 'categoryId' | 'paymentMethodId' | 'hasInstalment' | 'updatedAt' | 'deletedAt'
> & { category: string | null; paymentMethod: string | null })[];
