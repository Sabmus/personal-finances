import { Trash2 } from 'lucide-react';

const DeleteForm = ({ id, deleteAction }: { id: string; deleteAction: (id: string) => Promise<void> }) => {
  const deleteWithId = deleteAction.bind(null, id);

  return (
    <form action={deleteWithId}>
      <button>
        <Trash2 size={24} className="text-error hover:cursor-pointer" />
      </button>
    </form>
  );
};

export default DeleteForm;
