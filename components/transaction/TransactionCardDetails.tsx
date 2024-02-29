import { toCLP } from '@/utils';
import { ITransactionCardDetailsProps } from '@/lib/definitions';

const TransactionCardDetails = ({ showDetails, transaction }: ITransactionCardDetailsProps) => {
  return (
    <div className={`overflow-y-hidden transition-all duration-200 easy-in ${showDetails ? 'h-full' : 'h-0'} `}>
      <div className="flex flex-col gap-2 px-2 py-1">
        <div>
          <p className="text-surface">
            spent with <span className="text-accent">{transaction.paymentMethod}</span> in{' '}
            <span className="text-accent">{transaction.category}</span>{' '}
          </p>
        </div>

        {transaction.hasInstalment && (
          <div>
            <p className="text-surface">
              Instalment:{' '}
              <span>
                {transaction.instalmentQuantity} x {toCLP(transaction.instalmentAmount ?? 0)}
              </span>{' '}
            </p>
          </div>
        )}
        <div>
          <h6>Notes:</h6>
          <p className="text-surface">{transaction.notes}</p>
        </div>
        <div className="flex justify-center">
          <span>{transaction.createdAt.toDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCardDetails;
