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
    <>
      {status.pending ? (
        <Loader2 size={20} className={`animate-spin ${className}`} />
      ) : (
        <button disabled={status.pending} className={`link ${className}`}>
          {btnName}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
