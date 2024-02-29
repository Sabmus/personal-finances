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

export type GroupState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string;
};

export interface IPaymentTableListProps {
  transaction: TAllTransactions;
  handleButtonClick: () => void;
}

export type TCreateFormAction = (
  prevState: CategoryState,
  formData: FormData
) => Promise<{ errors: { name?: string[] | undefined }; message: string } | { message: string; errors: undefined }>;

export type TCreateFormProps = {
  action: TCreateFormAction;
};

export type TDeleteFormAction = (id: string) => Promise<{
  status: string;
  message: string;
}>;

export type TEditFormAction = (
  id: string,
  prevState: CategoryState,
  formData: FormData
) => Promise<{ errors: { name?: string[] | undefined }; message: string } | { message: string; errors: undefined }>;

export type TTableData<T> = {
  colName: string;
  data: T[];
  action: TEditFormAction;
  deleteAction: (id: string) => Promise<void>;
  searchParams: Record<string, string> | null | undefined;
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

type TGroupsData = {
  id: string;
  name: string;
  description: string;
  owner: boolean;
};

export interface ISubConfigurationProps {
  title: string;
  btnTitle: string;
  //data: TGroupsData[] | IInputObject[];
  dataFunction: () => Promise<TGroupsData[] | IInputObject[]>;
  createAction: TCreateFormAction;
  editAction: TEditFormAction;
  deleteAction: TDeleteFormAction;
}

export interface IConfigurationItemsProps {
  item: IInputObject;
  editAction: TEditFormAction;
  deleteAction: TDeleteFormAction;
}

export interface ICreateConfigurationItemProps {
  action: TCreateFormAction;
  btnTitle: string;
}

export interface IUpdateConfigurationItem {
  id: string;
  inputValue: string;
  action: TEditFormAction;
  handleShowOptions: () => void;
}

export interface IDeleteConfigurationItemProps {
  id: string;
  action: TDeleteFormAction;
}

export interface ITransactionCardHeaderProps {
  amount: number;
  category: string | null;
  showDetails: boolean;
  handleShowDetails: () => void;
}

export interface ITransactionCardDetailsProps {
  showDetails: boolean;
  transaction: TAllTransactions;
}
