import { X } from 'lucide-react';
import { IModalProps } from '@/lib/definitions';
import { UpdateForm } from '@/components/ui';

const Modal = ({ divRef, modalClose, selectedItem, action }: IModalProps) => {
  return (
    <div ref={divRef} className="relative h-full border-test">
      <div className="py-2 mt-2">
        <h4>Edit Category</h4>
      </div>
      <div className="px-8">
        <UpdateForm selectedItem={selectedItem} action={action} />
      </div>
      <div className="absolute text-error top-1 right-1">
        <X size={24} strokeWidth={4} className="hover:cursor-pointer hover:scale-110" onClick={modalClose} />
      </div>
    </div>
  );
};

export default Modal;
