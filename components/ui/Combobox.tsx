'use client';

import { ChangeEvent, useState, useRef, useEffect, MouseEvent, forwardRef, HTMLProps } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

type TDataArray = string[];
type InputProps = HTMLProps<HTMLInputElement> & { dataArray: TDataArray };

const Combobox = forwardRef<HTMLInputElement, InputProps>(({ dataArray, ...props }, ref) => {
  const { id, name, className, placeholder } = props;

  const [active, setActive] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => setActive(false));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (e: MouseEvent<HTMLDivElement>) => {
    setQuery(e.currentTarget.innerText);
    setActive(false);
  };

  const filteredData =
    query === '' ? dataArray : dataArray.filter(item => item.toLowerCase().includes(query.toLowerCase()));

  const KEY_CODES = {
    ESCAPE: 'Escape',
    ESCAPE_IE11: 'Esc',
    TAB: 'Tab',
  };

  const keyDownHandler = (e: { key: any }) => {
    switch (e.key) {
      case KEY_CODES.TAB:
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setActive(false);
        document.getElementById(`${id}`)?.blur();
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <input
        ref={ref}
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        type="text"
        onChange={e => handleInputChange(e)}
        onFocus={() => setActive(true)}
        value={query}
        autoComplete="off"
      />
      <div className="absolute bg-blue-400 w-full top-7 z-10">
        {active &&
          filteredData.map(item => (
            <div key={item} className="hover:bg-green-400" onClick={e => handleItemClick(e)}>
              {item}
            </div>
          ))}
      </div>
    </div>
  );
});
Combobox.displayName = 'Combobox';

export default Combobox;
