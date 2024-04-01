import { SubConfiguration } from '@/components/configuration';
import {
  createPaymentMethod,
  editPaymentMethod,
  deletePaymentMethod,
} from '@/lib/actions/paymentMethodsActions';
import { getPaymentMethods } from '@/lib/data';

const PaymentMethodsPage = async () => {
  const paymentMethods = await getPaymentMethods();

  return (
    <div className="h-full">
      <SubConfiguration
        title="Payment Methods"
        btnTitle="Add"
        resource={paymentMethods}
        //dataFunction={getPaymentMethods}
        createAction={createPaymentMethod}
        editAction={editPaymentMethod}
        deleteAction={deletePaymentMethod}
      />
    </div>
  );
};

export default PaymentMethodsPage;
