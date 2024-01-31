import type { Transaction } from '@/db/models';

export interface IPath {
  name: string;
  url: string;
}

export interface IDimension {
  id: string;
  name: string;
}

export interface IInputObject {
  id: string;
  name: string;
}

export type TAllTransactions = Omit<Transaction, 'userId' | 'updatedAt' | 'deletedAt'> & {
  category: string | null;
  paymentMethod: string | null;
};

export type PaymentFormProps = {
  type?: string;
  categories: IInputObject[];
  paymentMethods: IInputObject[];
  transaction: TAllTransactions | undefined;
};

export interface ActionPaymentFormProps extends PaymentFormProps {
  formAction: (payload: FormData) => void;
  state: PaymentState;
}

export type PaymentState = {
  errors?: {
    categoryId?: string[];
    paymentMethodId?: string[];
    amount?: string[];
    hasInstalment?: string[];
    instalmentQuantity?: string[];
    instalmentAmount?: string[];
    notes?: string[];
  };
  message?: string;
};

export type CategoryState = {
  errors?: {
    name?: string[];
  };
  message?: string;
};

export type PaymentMethodState = {
  errors?: {
    name?: string[];
  };
  message?: string;
};

export interface IPaymentTableListProps {
  transaction: TAllTransactions;
  handleButtonClick: () => void;
  setIsOpen: () => void;
  idx: string;
}

export type TEditFormAction = (
  id: string,
  prevState: CategoryState,
  formData: FormData
) => Promise<{ errors: { name?: string[] | undefined }; message: string } | { message: string; errors: undefined }>;

export type TTableData<T> = {
  colName: string;
  data: T[];
  action: TEditFormAction;
};

export type TTableDataProps = TTableData<IDimension>;

export interface IModalProps {
  divRef: React.RefObject<HTMLDivElement>;
  modalClose: () => void;
  selectedItem: IDimension;
  action: TEditFormAction;
}

export type TUpdateFormProps = {
  selectedItem: IDimension;
  action: TEditFormAction;
};
