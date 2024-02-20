'use client';

import { useState } from 'react';
import { IConfigurationItemsProps } from '@/lib/definitions';
import { Settings, X } from 'lucide-react';
import { UpdateConfigurationItem } from '@/components/configuration';

const ConfigurationItem = ({ item }: IConfigurationItemsProps) => {
  const { id, name } = item;
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(prev => !prev);
  };

  const handleShowOptions = () => {
    setShowOptions(prev => !prev);
    setShowEdit(false);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 py-1 rounded-sm border-test select-none">
        {showEdit ? <UpdateConfigurationItem action={() => {}} inputValue={name} /> : <h6>{name}</h6>}
        <div className="flex items-center gap-1">
          {showOptions && !showEdit && (
            <div className="flex gap-2">
              <a href="#" onClick={handleEdit}>
                Edit
              </a>
              <a href="#">Delete</a>
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
    </>
  );
};

export default ConfigurationItem;
