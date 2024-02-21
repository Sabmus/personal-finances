'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ name }: { name: string }) => {
  const status = useFormStatus();

  return (
    <>
      {status.pending ? (
        <Loader2 size={20} className="mx-auto animate-spin" />
      ) : (
        <button disabled={status.pending} className="mx-auto text-accent hover:text-accent-hover">
          {name}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
