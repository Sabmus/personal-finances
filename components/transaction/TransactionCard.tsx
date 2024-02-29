'use client';

import { useState } from 'react';
import { TransactionCardHeader, TransactionCardDetails } from '@/components/transaction';
import { TAllTransactions } from '@/lib/definitions';

const TransactionCard = ({ transaction }: { transaction: TAllTransactions }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <div className="border border-accent-darker rounded-sm">
      <TransactionCardHeader
        amount={transaction.amount}
        category={transaction.category}
        showDetails={showDetails}
        handleShowDetails={handleShowDetails}
      />
      <TransactionCardDetails showDetails={showDetails} transaction={transaction} />
    </div>
  );
};

export default TransactionCard;
