import { TAllTransactions } from '@/lib/definitions';
import { toCLP } from '@/utils';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

const TransacionModal = ({
  divRef,
  isOpen,
  setIsOpen,
  selectedTransaction,
}: {
  divRef: React.RefObject<HTMLDivElement>;
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
      ref={divRef}
      id="transactionDetails"
      tabIndex={-1}
      aria-hidden={isOpen}
      className="relative bg-background border border-accent mx-auto flex flex-col gap-2 items-center"
    >
      <span className="absolute text-error top-1.5 right-2 hover:cursor-pointer" onClick={handleCloseClick}>
        <X size={24} strokeWidth={5} />
      </span>
      <div className="flex-center w-full h-20 text-center bg-accent-darker border border-b-accent">
        <h1>{toCLP(amount)}</h1>
      </div>
      <div>
        <p className="text-foreground-secondary">
          expended in <span className="text-accent">{category}</span> with:{' '}
          <span className="text-accent">{paymentMethod}</span>
        </p>
      </div>

      {hasInstalment && (
        <div className="grid grid-cols-2 w-full text-center py-2">
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
        <div className="px-24 py-2 w-full">
          <h6>Notes</h6>
          <p className="text-foreground-secondary">{notes}</p>
        </div>
      )}

      <div className="py-1 border-t border-accent mt-4">
        <span>{createdAt.toDateString()}</span>
      </div>
    </div>
  );
};

export default TransacionModal;
