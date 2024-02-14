import { X } from 'lucide-react';
import Link from 'next/link';

const DeleteForm = ({
  id,
  deleteAction,
  searchParams,
  href,
}: {
  id: string;
  deleteAction: (id: string) => Promise<void>;
  searchParams: Record<string, string> | null | undefined;
  href: string;
}) => {
  const showModal = searchParams?.show;
  const modalId = searchParams?.id;
  const deleteWithId = deleteAction.bind(null, id);

  return (
    <>
      <Link href={`/dashboard/configuration?show=true&id=${id}`}>Delete</Link>
      {showModal && modalId === id && (
        <div className="absolute w-96 text-center p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface z-10 rounded-sm">
          <Link
            href={href}
            className="absolute top-2 right-2 hover:scale-110 hover:cursor-pointer border border-red-600"
          >
            <X size={24} className="text-red-600" />
          </Link>
          <p>Do you really want to delete this?</p>
          <form action={deleteWithId} className="text-center leading-none mt-4">
            <button className="btn">Delete</button>
          </form>
        </div>
      )}
    </>
  );
};

export default DeleteForm;
