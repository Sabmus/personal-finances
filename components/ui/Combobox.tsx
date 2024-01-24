'use client';

import { ChangeEvent, useState, useRef } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

type TDataArray = string[];

const Combobox = ({ dataArray }: { dataArray: TDataArray }) => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => setActive(false));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setActive(true);
    console.log('focus');
  };

  const filteredData =
    query === '' ? dataArray : dataArray.filter(item => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        name="name"
        id="id"
        className="w-full"
        placeholder="type something..."
        onChange={e => handleInputChange(e)}
        onFocus={handleFocus}
        value={query}
        autoComplete="off"
      />
      <div className="absolute bg-blue-400 w-full top-7">
        {active &&
          filteredData.map(item => (
            <div key={item} className="">
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Combobox;
