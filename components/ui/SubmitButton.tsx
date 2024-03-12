'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface ISubmitButtonProps {
  btnName: string;
  className?: string;
}

const SubmitButton = ({ btnName, className }: ISubmitButtonProps) => {
  const status = useFormStatus();

  return (
    <button disabled={status.pending} className={`btn mx-auto ${className}`}>
      {status.pending ? <Loader2 size={20} className="animate-spin mx-auto" /> : btnName}
    </button>
  );
};

export default SubmitButton;
