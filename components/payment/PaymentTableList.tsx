import { toCLP } from '@/utils';
import { Eye, SquarePen } from 'lucide-react';
import Link from 'next/link';
import DeletePayment from '@/components/payment/DeletePayment';
import { IPaymentTableListProps } from '@/lib/definitions';
import { useEffect } from 'react';
import { KEY_CODES } from '@/utils';

const PaymentTableList = ({ transaction, handleButtonClick, setIsOpen, idx }: IPaymentTableListProps) => {
  const keyDownHandler = (e: any) => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setIsOpen();
        document.getElementById(`${idx}`)?.blur();
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
    <tr className="table-body-tr">
      <td className="table-td">
        <button id={idx} onClick={handleButtonClick}>
          <Eye size={20} className="text-accent hover:text-accent-hover" />
        </button>
      </td>
      <th scope="row" className="table-td font-medium whitespace-nowrap">
        {transaction.category}
      </th>
      <td className="table-td">{transaction.paymentMethod}</td>
      <td className="table-td">{toCLP(transaction.amount)}</td>
      <td className="table-td">{transaction.instalmentQuantity}</td>
      <td className="table-td">{toCLP(transaction.instalmentAmount ?? 0)}</td>
      <td className="table-td">{transaction.createdAt.toDateString()}</td>
      <td className="table-td">
        <div className="flex justify-between items-center">
          <span>
            <Link href={`/dashboard/payment/${transaction.id}/edit`}>
              <SquarePen size={22} className="" />
            </Link>
          </span>
          <span>
            <DeletePayment id={transaction.id} />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default PaymentTableList;
