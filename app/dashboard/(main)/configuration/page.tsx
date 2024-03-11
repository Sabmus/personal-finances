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
    <div className="h-full overflow-y-hidden">
      <MainConfiguration
        configurationList={configurationList}
        categories={categories}
        paymentMethods={paymentMethods}
        groups={groups}
      />
    </div>
  );
};

export default Configuration;
