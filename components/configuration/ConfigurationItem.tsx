import { IConfigurationItemsProps } from '@/lib/definitions';
import { Settings } from 'lucide-react';

const ConfigurationItem = ({ item }: IConfigurationItemsProps) => {
  const { id, name } = item;

  return (
    <>
      <div className="flex justify-between items-center px-2 py-1 rounded-sm border-test">
        <h6>{name}</h6>
        <div className="flex items-center gap-1">
          <div className="flex gap-2">
            <a href="#">Edit</a>
            <a href="#">Delete</a>
          </div>
          <Settings size={20} className="hover:scale-110 hover:cursor-pointer" />
        </div>
      </div>
      <div className="w-40 h-10 bg-blue-500"></div>
    </>
  );
};

export default ConfigurationItem;
