'use client';

import { useState, useRef, useEffect } from 'react';
import { TTableDataProps, IDimension } from '@/lib/definitions';
import { Modal } from '@/components/ui';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { SquarePen } from 'lucide-react';
import useCloseOnEscKey from '@/hooks/useCloseOnEscKey';
import { DeleteForm } from '@/components/ui';

const MainTable = ({ colName, data, action, deleteAction }: TTableDataProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDimension>();

  const divRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(divRef, () => setIsModalOpen(false));

  const handleOnClick = (idx: number) => {
    setIsModalOpen(prev => !prev);
    setSelectedItem(data[idx]);
  };

  useCloseOnEscKey(() => setIsModalOpen(false));

  useEffect(() => {
    setIsModalOpen(false);
  }, [data]);

  return (
    <div className="relative h-full">
      <table className={`table-main w-1/2 mx-auto ${isModalOpen ? 'blur-sm' : null}`}>
        <thead className="table-head">
          <tr>
            <th scope="col" className="table-th">
              {colName}
            </th>
            <th scope="col" className="table-th text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, idx) => (
              <tr key={idx} className="table-body-tr">
                <td className="table-td">{item.name}</td>
                <td className="table-td flex justify-around">
                  <SquarePen
                    size={24}
                    onClick={() => handleOnClick(idx)}
                    className="text-accent hover:cursor-pointer"
                  />
                  <DeleteForm id={item.id} deleteAction={deleteAction} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && selectedItem && (
        <div className="absolute w-1/3 h-1/4 top-8 left-0 right-0 mx-auto z-10 text-center bg-background">
          <Modal divRef={divRef} modalClose={() => setIsModalOpen(false)} selectedItem={selectedItem} action={action} />
        </div>
      )}
    </div>
  );
};

export default MainTable;
