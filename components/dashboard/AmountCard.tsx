import { toCLP } from '@/utils';

interface IAmountCardProps {
  title: string;
  amount: number;
  info: string;
}

const AmountCard = ({ title, amount, info }: IAmountCardProps) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-between">
        <h6 className="text-foreground/50">{title}</h6>
        <span className="text-foreground/50">icon</span>
      </div>
      <div className="flex justify-center gap-1 items-baseline">
        <h1 className="text-accent text-header-clamp">{toCLP(amount)}</h1>
        <span className="text-xs">CLP</span>
      </div>
      <div className="w-2/3 mx-auto text-xs text-center">
        <span className="text-foreground/50">10% of salary</span>
      </div>
    </div>
  );
};

export default AmountCard;
