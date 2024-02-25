import { getTotalAmount } from '@/lib/data';
import { toCLP } from '@/utils';

const TotalAmount = async () => {
  const totalAmount = await getTotalAmount();

  return <>{totalAmount && <span>{toCLP(Number(totalAmount))}</span>}</>;
};

export default TotalAmount;
