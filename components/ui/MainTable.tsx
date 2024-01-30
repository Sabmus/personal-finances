'use client';

import { useState, useRef } from 'react';
import { TTableDataProps, IDimension } from '@/lib/definitions';
import { Modal } from '@/components/ui';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { SquarePen, Trash2 } from 'lucide-react';
import useCloseOnEscKey from '@/hooks/useCloseOnEscKey';

const MainTable = ({ colName, data }: TTableDataProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDimension>();

  const divRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(divRef, () => setIsModalOpen(false));

  const handleOnClick = (idx: number) => {
    setIsModalOpen(prev => !prev);
    setSelectedItem(data[idx]);
  };

  useCloseOnEscKey(() => setIsModalOpen(false));

  return (
    <div className="relative h-full">
      <table className="table-main w-1/2 mx-auto">
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
                  <Trash2 size={24} className="text-error hover:cursor-pointer" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && selectedItem && (
        <div className="absolute w-1/3 h-1/3 top-8 left-0 right-0 mx-auto z-10 text-center bg-background">
          <Modal divRef={divRef} modalClose={() => setIsModalOpen(false)} selectedItem={selectedItem} />
        </div>
      )}
    </div>
  );
};

export default MainTable;
