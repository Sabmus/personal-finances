export const KEY_CODES = {
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_UP_IE11: 'Up',
  ARROW_DOWN: 'ArrowDown',
  ARROW_DOWN_IE11: 'Down',
  ENTER: 'Enter',
};

export function toCLP(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value);
}

export function toUSD(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export const configurationList = ['Categories', 'Payment Methods', 'Groups'];
