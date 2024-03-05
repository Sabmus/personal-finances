import { getTotalAmount } from '@/lib/data';
import { toCLP } from '@/utils';

const TotalAmount = async () => {
  const totalAmount = await getTotalAmount();

  return (
    <>
      {totalAmount.data && !totalAmount.error ? (
        <span>{toCLP(Number(totalAmount.data))}</span>
      ) : (
        <span className="text-lg text-error">{totalAmount.error}</span>
      )}
    </>
  );
};

export default TotalAmount;
