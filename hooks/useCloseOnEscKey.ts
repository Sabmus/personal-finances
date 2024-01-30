import { KEY_CODES } from '@/utils';
import { useEffect } from 'react';

const useCloseOnEscKey = (handler: () => void) => {
  // handler is the function that will be called when the escape key is pressed
  // idx is a element id that will be blurred when the escape key is pressed

  const keyDownHandler = (e: any) => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        handler();
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
};

export default useCloseOnEscKey;
