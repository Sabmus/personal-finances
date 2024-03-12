import { getGroups, getCategories, getPaymentMethods, getUserData } from '@/lib/data';
import { MainConfiguration } from '@/components/configuration';
import { configurationList } from '@/utils';

const Configuration = async () => {
  const [categories, paymentMethods, groups, userData] = await Promise.all([
    getCategories(),
    getPaymentMethods(),
    getGroups(),
    getUserData(),
  ]);

  return (
    <div className="h-full overflow-y-hidden">
      <MainConfiguration
        configurationList={configurationList}
        categories={categories}
        paymentMethods={paymentMethods}
        groups={groups}
        userData={userData}
      />
    </div>
  );
};

export default Configuration;
