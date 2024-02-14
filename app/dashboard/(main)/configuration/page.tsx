import { PaymentMethods } from '@/components/configuration';
import { MainTable } from '@/components/ui';
import { getCategories, getPaymentMethods } from '@/lib/data';
import { editCategory, deleteCategory, editPaymentMethod, deletePaymentMethod } from '@/lib/actions';

const Configuration = async ({ searchParams }: { searchParams: Record<string, string> | null | undefined }) => {
  const categories = await getCategories();
  const paymentMethods = await getPaymentMethods();

  return (
    <div>
      {/**
       * <PaymentMethods searchParams={searchParams} />
       */}
      <MainTable
        colName={'Category'}
        data={categories}
        action={editCategory}
        deleteAction={deleteCategory}
        searchParams={searchParams}
      />

      <MainTable
        colName={'Payment Methods'}
        data={paymentMethods}
        action={editPaymentMethod}
        deleteAction={deletePaymentMethod}
        searchParams={searchParams}
      />
    </div>
  );
};

export default Configuration;
