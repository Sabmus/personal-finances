import { toCLP } from '@/utils';
import { Eye, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { DeleteTransaction } from '@/components/transaction';
import { IPaymentTableListProps } from '@/lib/definitions';
import { deleteTransaction } from '@/lib/actions/transactionActions';

const PaymentTableList = ({ transaction, handleButtonClick }: IPaymentTableListProps) => {
  return (
    <tr className="table-body-tr">
      <td className="table-td">
        <span onClick={handleButtonClick} className="hover:cursor-pointer">
          <Eye size={20} className="text-accent hover:text-accent-hover" />
        </span>
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
            <Link href={`/dashboard/transactions/${transaction.id}/edit`}>
              <SquarePen size={22} className="" />
            </Link>
          </span>
          <span>
            <DeleteTransaction id={transaction.id} action={deleteTransaction} />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default PaymentTableList;
