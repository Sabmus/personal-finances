'use client';

import { useState, useRef } from 'react';
import { toCLP } from '@/utils';
import { ITransactionCardHeaderProps } from '@/lib/definitions';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { DeleteTransaction } from '@/components/transaction';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const TransactionCardHeader = ({
  id,
  amount,
  category,
  showDetails,
  handleShowDetails,
  deleteAction,
}: ITransactionCardHeaderProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const spanRef = useRef(null);

  const handleShowSettings = () => {
    setShowSettings(prev => !prev);
  };

  useOnClickOutside(spanRef, () => setShowSettings(false));

  return (
    <div ref={spanRef} className="flex justify-between items-center bg-purple-900">
      <div
        className="flex justify-between items-center flex-grow px-2 py-1 overflow-x-hidden"
        onClick={handleShowDetails}
      >
        <span
          className={`relative text-accent text-xl transition-all duration-200 ease-in ${
            showDetails && !showSettings ? 'left-1/2 -translate-x-1/2' : 'left-0'
          }`}
        >
          {toCLP(amount)}
        </span>
        <span
          className={`relative text-surface transition-all duration-200 ease-in ${
            showSettings || showDetails ? 'opacity-0 -right-40' : 'opacity-100 right-0'
          }`}
        >
          {category}
        </span>
      </div>
      <div className="relative flex items-center">
        <div
          className={`absolute flex gap-2 px-2 transition-all duration-200 ${
            showSettings ? 'opacity-100 right-7' : 'opacity-0 -right-40'
          }`}
        >
          <Link href={`/dashboard/transactions/${id}/edit`}>Edit</Link>
          <DeleteTransaction id={id} action={deleteAction} buttonName="Delete" />
        </div>
        <span>
          <Settings size={20} className="mx-2" onClick={handleShowSettings} />
        </span>
      </div>
    </div>
  );
};

export default TransactionCardHeader;
