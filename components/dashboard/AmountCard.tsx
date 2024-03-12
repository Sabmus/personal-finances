import { toCLP } from '@/utils';
import { CircleDollarSign } from 'lucide-react';

interface IAmountCardProps {
  title: string;
  amount: number;
  info: number;
}

const AmountCard = ({ title, amount, info }: IAmountCardProps) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-between items-center">
        <h6 className="text-foreground-secondary">{title}</h6>
        <span className="text-foreground-secondary">
          <CircleDollarSign size={22} />
        </span>
      </div>
      <div className="text-center">
        <h1 className="text-accent text-header-clamp">{toCLP(amount)}</h1>
      </div>
      <div className="w-2/3 mx-auto text-xs text-center">
        <span className="text-foreground-secondary">{info}% of salary</span>
      </div>
    </div>
  );
};

export default AmountCard;
