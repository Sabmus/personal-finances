import { toCLP } from '@/utils';
import { LucideIcon } from 'lucide-react';

interface IAmountCardProps {
  title: string;
  icon: LucideIcon;
  amount: number;
  info: string;
}

const AmountCard = ({ title, icon, amount, info }: IAmountCardProps) => {
  return (
    <div className="flex flex-col justify-between h-full p-2">
      <div className="flex justify-between">
        <h4>{title}</h4>
        <span>{icon}</span>
      </div>
      <div className="flex">
        <h1>{toCLP(amount)}</h1>
        <span>CLP</span>
      </div>
      <div>
        <span>{info}</span>
      </div>
    </div>
  );
};

export default AmountCard;
