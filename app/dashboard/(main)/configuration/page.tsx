import { getGroups, getCategories, getPaymentMethods } from '@/lib/data';
import { MainConfiguration } from '@/components/configuration';
import { configurationList } from '@/utils';

const Configuration = async () => {
  const [categories, paymentMethods, groups] = await Promise.all([
    getCategories(),
    getPaymentMethods(),
    getGroups(),
  ]);

  return (
    <div className="h-full">
      <MainConfiguration
        configurationList={configurationList}
        categories={categories}
        paymentMethods={paymentMethods}
        groups={groups}
      />

      {/* <Suspense fallback={<ConfigurationItemSkeleton title="Categories" />}>
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
      <Suspense fallback={<ConfigurationItemSkeleton title="Groups" />}>
        <SubConfiguration
          title="Groups"
          btnTitle="Add new group"
          //data={categories}
          dataFunction={getGroups}
          createAction={createGroup}
          editAction={editGroup}
          deleteAction={deleteGroup}
        />
      </Suspense> */}
    </div>
  );
};

export default Configuration;
