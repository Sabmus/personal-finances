'use client';

import { useState } from 'react';
import { TransactionCardHeader, TransactionCardDetails } from '@/components/transaction';
import { ITransactionCardProps } from '@/lib/definitions';

const TransactionCard = ({ transaction, deleteAction }: ITransactionCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <div className="border border-accent-darker rounded-sm overflow-x-hidden">
      <TransactionCardHeader
        id={transaction.id}
        amount={transaction.amount}
        category={transaction.category}
        showDetails={showDetails}
        handleShowDetails={handleShowDetails}
        deleteAction={deleteAction}
      />
      <TransactionCardDetails showDetails={showDetails} transaction={transaction} />
    </div>
  );
};

export default TransactionCard;
