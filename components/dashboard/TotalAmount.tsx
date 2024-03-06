import { getTotalAmount } from '@/lib/data';
import { AmountCard } from '@/components/dashboard';
import { DollarSign } from 'lucide-react';

const TotalAmount = async () => {
  const totalAmount = await getTotalAmount();

  return (
    <>
      {totalAmount.data && !totalAmount.error ? (
        <AmountCard title="Total" icon={DollarSign} amount={Number(totalAmount.data)} info="some info" />
      ) : (
        <span className="text-lg text-error">{totalAmount.error}</span>
      )}
    </>
  );
};

export default TotalAmount;
