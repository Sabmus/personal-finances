'use client';

import { ChangeEvent, useState, useRef, useEffect, MouseEvent, forwardRef, HTMLProps } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

type TDataArray = string[];
type InputProps = HTMLProps<HTMLInputElement> & { dataArray: TDataArray };

const Combobox = forwardRef<HTMLInputElement, InputProps>(({ dataArray, ...props }, ref) => {
  const { id, name, className, placeholder } = props;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setactive] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(inputRef, () => {
    setOpen(false);
    setactive(-1);
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (e: MouseEvent<HTMLLIElement>) => {
    setQuery(e.currentTarget.innerText);
    setOpen(false);
  };

  const filteredData =
    query === '' ? dataArray : dataArray.filter(item => item.toLowerCase().includes(query.toLowerCase()));

  const KEY_CODES = {
    ESCAPE: 'Escape',
    ESCAPE_IE11: 'Esc',
    TAB: 'Tab',
    ARROW_UP: 'ArrowUp',
    ARROW_UP_IE11: 'Up',
    ARROW_DOWN: 'ArrowDown',
    ARROW_DOWN_IE11: 'Down',
    ENTER: 'Enter',
  };

  const keyDownHandler = (e: any) => {
    switch (e.key) {
      case KEY_CODES.TAB:
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setOpen(false);
        setactive(-1);
        document.getElementById(`${id}`)?.blur();
        break;
      }
      case KEY_CODES.ARROW_DOWN_IE11:
      case KEY_CODES.ARROW_DOWN: {
        if (open && active < filteredData.length - 1) {
          setactive(prev => prev + 1);
        }
        break;
      }
      case KEY_CODES.ARROW_UP_IE11:
      case KEY_CODES.ARROW_UP: {
        if (open && active > 0) {
          setactive(prev => prev - 1);
        }
        break;
      }
      case KEY_CODES.ENTER: {
        if (open && active > -1) {
          e.preventDefault();
          setQuery(filteredData[active]);
          setOpen(false);
        }
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
        onFocus={() => setOpen(true)}
        onKeyDown={e => keyDownHandler(e)}
        value={query}
        autoComplete="off"
      />
      <div className="absolute bg-blue-400 w-full top-7 z-10">
        {open && (
          <ul>
            {filteredData.map((item, idx) => (
              <li
                key={item}
                className={`hover:bg-green-400 ${active === idx ? 'bg-green-400' : null}`}
                onClick={e => handleItemClick(e)}
                onMouseEnter={() => setactive(-1)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});
Combobox.displayName = 'Combobox';

export default Combobox;
