'use client';

import { useState, useRef } from 'react';
import { IConfigurationItemsProps } from '@/lib/definitions';
import { Settings, X } from 'lucide-react';
import { UpdateConfigurationItem, DeleteConfigurationItem } from '@/components/configuration';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const ConfigurationItem = ({ item, editAction, deleteAction }: IConfigurationItemsProps) => {
  const { id, name } = item;
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const divRef = useRef(null);

  useOnClickOutside(divRef, () => {
    setShowOptions(false);
    setShowEdit(false);
  });

  const handleEdit = () => {
    setShowEdit(prev => !prev);
  };

  const handleShowOptions = () => {
    setShowOptions(prev => !prev);
    setShowEdit(false);
  };

  return (
    <div
      ref={divRef}
      className="h-14 flex justify-between items-center px-2 select-none rounded-md hover:bg-background border-r-4 border-r-transparent hover:border-r-accent"
    >
      {showEdit ? (
        <UpdateConfigurationItem
          id={id}
          inputValue={name}
          action={editAction}
          handleShowOptions={handleShowOptions}
        />
      ) : (
        <h6>{name}</h6>
      )}
      <div className="relative flex items-center gap-1">
        <div
          className={`absolute flex items-center gap-2 transition-all duration-200 ${
            showOptions && !showEdit ? '-left-24 opacity-100' : 'left-10 opacity-0'
          }`}
        >
          <button className="link leading-none" onClick={handleEdit}>
            Edit
          </button>
          <DeleteConfigurationItem id={id} action={deleteAction} />
        </div>
        {showEdit ? (
          <button onClick={handleEdit}>
            <X size={24} className="text-red-400 hover:scale-110 hover:cursor-pointer bg-surface" />
          </button>
        ) : (
          <Settings
            size={20}
            className={`bg-surface hover:cursor-pointer duration-200 ease-in ${
              showOptions ? 'rotate-90 scale-110' : 'rotate-0 scale-100'
            }`}
            onClick={handleShowOptions}
          />
        )}
      </div>
    </div>
  );
};

export default ConfigurationItem;
