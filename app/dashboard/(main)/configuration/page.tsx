import { getGroups, getCategories, getPaymentMethods } from '@/lib/data';
import { SubConfiguration } from '@/components/configuration';
import { createCategory, editCategory, deleteCategory } from '@/lib/actions/categoryActions';
import { createPaymentMethod, editPaymentMethod, deletePaymentMethod } from '@/lib/actions/paymentMethodsActions';
import { Suspense } from 'react';
import { ConfigurationItemSkeleton } from '@/components/skeleton';

const Configuration = async () => {
  return (
    <div className="h-full">
      <Suspense fallback={<ConfigurationItemSkeleton title="Categories" />}>
        <SubConfiguration
          title="Categories"
          btnTitle="Add Category"
          //data={categories}
          dataFunction={getCategories}
          createAction={createCategory}
          editAction={editCategory}
          deleteAction={deleteCategory}
        />
      </Suspense>
      <Suspense fallback={<ConfigurationItemSkeleton title="Payment Methods" />}>
        <SubConfiguration
          title="Payment Methods"
          btnTitle="Add Paymen Method"
          //data={categories}
          dataFunction={getPaymentMethods}
          createAction={createPaymentMethod}
          editAction={editPaymentMethod}
          deleteAction={deletePaymentMethod}
        />
      </Suspense>
    </div>
  );
};

export default Configuration;
