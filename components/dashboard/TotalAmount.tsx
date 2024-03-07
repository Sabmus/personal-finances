import { getTotalAmount } from '@/lib/data';
import { AmountCard, NoDataError } from '@/components/dashboard';

const TotalAmount = async () => {
  const totalAmount = await getTotalAmount();

  return (
    <div className="h-full bg-surface rounded-sm px-2 md:px-4 py-2">
      {totalAmount.data && !totalAmount.error ? (
        <AmountCard title="Total spent" amount={Number(totalAmount.data)} info="some info" />
      ) : (
        <NoDataError error={totalAmount.error} />
      )}
    </div>
  );
};

export default TotalAmount;
