'use client';

import { IDeleteConfigurationItemProps } from '@/lib/definitions';
import toast from 'react-hot-toast';

const DeleteConfigurationItem = ({ id, action }: IDeleteConfigurationItemProps) => {
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
      <button className="link">Delete</button>
    </form>
  );
};

export default DeleteConfigurationItem;
