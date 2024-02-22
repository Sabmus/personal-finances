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

  useOnClickOutside(divRef, () => setShowOptions(false));

  const handleEdit = () => {
    setShowEdit(prev => !prev);
  };

  const handleShowOptions = () => {
    setShowOptions(prev => !prev);
    setShowEdit(false);
  };

  return (
    <div ref={divRef} className="configurationItem">
      {showEdit ? (
        <UpdateConfigurationItem id={id} inputValue={name} action={editAction} handleShowOptions={handleShowOptions} />
      ) : (
        <h6>{name}</h6>
      )}
      <div className="flex items-center gap-1">
        {showOptions && !showEdit && (
          <div className="flex items-center gap-2">
            <button className="text-accent hover:text-accent-hover leading-none" onClick={handleEdit}>
              Edit
            </button>
            <DeleteConfigurationItem id={id} action={deleteAction} />
          </div>
        )}
        {showEdit ? (
          <button onClick={handleEdit}>
            <X size={24} className="text-red-400 hover:scale-110 hover:cursor-pointer" />
          </button>
        ) : (
          <Settings
            size={20}
            className={`hover:cursor-pointer duration-200 ease-in ${
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
