import { getLastTenTransactions } from '@/lib/data';
import { toCLP } from '@/utils';
import { NoDataError } from '@/components/dashboard';

const LastTransactionsTable = async () => {
  const transactions = await getLastTenTransactions();

  return (
    <div className="h-full px-1 md:px-4 overflow-y-auto">
      <table className="text-foreground/50 w-full bg-surface text-table-clamp">
        <thead className="sticky top-0 bg-surface">
          <tr className="text-left">
            <th scope="col" className="py-2">
              Date
            </th>
            <th scope="col" className="py-2">
              Category
            </th>
            <th scope="col" className="py-2 hidden md:inline-block">
              Payment Method
            </th>
            <th scope="col" className="py-2 md:hidden">
              Pay Method
            </th>
            <th scope="col" className="py-2">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.data && !transactions.error ? (
            transactions.data.map(transaction => (
              <tr key={transaction.id} className="border-b border-b-accent-darker">
                <td className="py-2 hidden md:inline-block">{transaction.createdAt.toLocaleString('es-CL')}</td>
                <td className="py-2 md:hidden">{transaction.createdAt.toLocaleDateString('es-CL')}</td>
                <td className="py-2">{transaction.category}</td>
                <td className="py-2">{transaction.paymentMethod}</td>
                <td className="py-2">{toCLP(transaction.amount)}</td>
              </tr>
            ))
          ) : (
            <NoDataError error={transactions.error} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LastTransactionsTable;
