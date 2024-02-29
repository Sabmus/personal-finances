'use client';

import { useState } from 'react';
import { toCLP } from '@/utils';
import { ITransactionCardHeaderProps } from '@/lib/definitions';
import { Settings } from 'lucide-react';

const TransactionCardHeader = ({ amount, category, showDetails, handleShowDetails }: ITransactionCardHeaderProps) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleShowSettings = () => {
    setShowSettings(prev => !prev);
  };

  return (
    <div className="flex justify-between items-center">
      <div
        className="flex justify-between items-center flex-grow px-2 py-1 overflow-x-hidden bg-purple-900"
        onClick={handleShowDetails}
      >
        <span
          className={`relative text-accent text-xl transition-all duration-200 ease-in ${
            showDetails ? 'left-1/2 -translate-x-1/2' : 'left-0'
          }`}
        >
          {toCLP(amount)}
        </span>
        <span
          className={`relative text-surface transition-all duration-200 ease-in ${
            showDetails ? 'opacity-0 -right-40' : 'opacity-100 right-0'
          }`}
        >
          {category}
        </span>
      </div>
      <Settings size={20} className="mx-2" onClick={handleShowSettings} />
    </div>
  );
};

export default TransactionCardHeader;
