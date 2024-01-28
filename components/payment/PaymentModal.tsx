import { TAllTransactions } from '@/lib/definitions';
import { toCLP } from '@/lib/currencyFormat';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

const PaymentModal = ({
  isOpen,
  setIsOpen,
  selectedTransaction,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedTransaction: TAllTransactions;
}) => {
  const { category, paymentMethod, amount, hasInstalment, instalmentQuantity, instalmentAmount, notes, createdAt } =
    selectedTransaction;

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      id="paymentDetails"
      tabIndex={-1}
      aria-hidden={isOpen}
      className="relative bg-background border border-accent mx-auto flex flex-col gap-2 items-center"
    >
      <span className="absolute text-error top-1.5 right-2 hover:cursor-pointer" onClick={handleCloseClick}>
        <X size={24} strokeWidth={5} />
      </span>
      <div className="w-full text-center bg-accent-darker border border-b-accent">
        <h3>{toCLP(amount)}</h3>
      </div>
      <div>
        <p className="text-foreground/60">
          expended in <span className="text-accent">{category}</span> with:{' '}
          <span className="text-accent">{paymentMethod}</span>
        </p>
      </div>

      {hasInstalment && (
        <div className="grid grid-cols-2 w-full text-center">
          <div>
            <h6>Instalment</h6>
            <span>{instalmentQuantity}</span>
          </div>
          <div>
            <h6>Amount</h6>
            <span>{instalmentAmount && toCLP(instalmentAmount)}</span>
          </div>
        </div>
      )}
      {notes && (
        <div className="px-4">
          <h6>Notes</h6>
          <p className="text-foreground/70">{notes}</p>
        </div>
      )}

      <div>
        <span>{createdAt.toDateString()}</span>
      </div>
    </div>
  );
};

export default PaymentModal;
