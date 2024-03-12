import { getTotalAmount } from '@/lib/data';
import { AmountCard, NoDataError } from '@/components/dashboard';

const TotalAmount = async () => {
  const result = await getTotalAmount();

  return (
    <div className="h-full bg-surface rounded-sm px-2 md:px-4 py-2">
      {result.data && !result.error ? (
        <AmountCard
          title="Total spent"
          amount={Number(result.data.totalAmount)}
          info={result.data.percentageOfSalary}
        />
      ) : (
        <NoDataError error={result.error} />
      )}
    </div>
  );
};

export default TotalAmount;
