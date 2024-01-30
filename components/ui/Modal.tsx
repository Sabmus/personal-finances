import { X } from 'lucide-react';
import { IDimension } from '@/lib/definitions';

interface IModalProps {
  divRef: React.RefObject<HTMLDivElement>;
  modalClose: () => void;
  selectedItem: IDimension;
}

const Modal = ({ divRef, modalClose, selectedItem }: IModalProps) => {
  return (
    <div ref={divRef} className="relative h-full border-test">
      <div className="py-2">
        <h4>Edit Category</h4>
      </div>
      <div>
        <input
          type="text"
          name="category"
          id="category"
          className="w-full p-2 border border-test"
          defaultValue={selectedItem.name}
        />
      </div>
      <div className="absolute text-error top-1 right-1">
        <X size={24} strokeWidth={4} className="hover:cursor-pointer hover:scale-110" onClick={modalClose} />
      </div>
    </div>
  );
};

export default Modal;
