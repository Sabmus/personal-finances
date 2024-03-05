'use client';

import { IDeleteTransactionProps } from '@/lib/definitions';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const DeleteTransaction = ({ id, action, buttonName }: IDeleteTransactionProps) => {
  const deleteActionWithId = action.bind(null, id);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirmation = window.confirm('Do you really want to delete this?');
    if (confirmation) {
      const result = await deleteActionWithId();
      if (result.status === 'success') {
        toast.success(result.message);
      }
      if (result.status === 'error') {
        toast.error(result.message);
      }
    }
  };

  return (
    <form onSubmit={e => handleFormSubmit(e)}>
      <button className="text-accent hover:text-accent-hover">{buttonName ? buttonName : <Trash2 size={22} />}</button>
    </form>
  );
};

export default DeleteTransaction;
