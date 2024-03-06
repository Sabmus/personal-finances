import { getTotalAmount } from '@/lib/data';
import { AmountCard } from '@/components/dashboard';

const TotalAmount = async () => {
  const totalAmount = await getTotalAmount();

  return (
    <div className="h-full bg-surface rounded-sm px-2 md:px-4 py-2">
      {totalAmount.data && !totalAmount.error ? (
        <AmountCard title="Total spent" amount={Number(totalAmount.data)} info="some info" />
      ) : (
        <div className="h-full flex justify-center items-center">
          <span className="text-lg text-error">{totalAmount.error}</span>
        </div>
      )}
    </div>
  );
};

export default TotalAmount;
