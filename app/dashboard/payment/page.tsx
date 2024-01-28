import Link from 'next/link';
// import { getAllTransactions } from '@/lib/data';
import PaymentTable from '@/components/payment/PaymentTable';
import { TAllTransactions } from '@/lib/definitions';

const Payment = async () => {
  // const transactions = await getAllTransactions();
  const transactions: TAllTransactions[] = [
    {
      id: 'fhv98qb1pmjjyc2arpaedk1p',
      category: 'Transport',
      paymentMethod: 'Debit Card',
      amount: 10000,
      hasInstalment: false,
      instalmentQuantity: null,
      instalmentAmount: null,
      notes: 'nota de test',
      createdAt: new Date('2024-01-25T23:43:56.849Z'),
    },
    {
      id: 'fsdjpv67badahudjrs8ruy5q',
      category: 'Entertainment',
      paymentMethod: 'Debit Card',
      amount: 1312321,
      hasInstalment: true,
      instalmentQuantity: 123123,
      instalmentAmount: 123,
      notes: 'test',
      createdAt: new Date('2024-01-25T23:43:56.849Z'),
    },
    {
      id: 'jneg701x75pkbt535qz4ev5j',
      category: 'Food',
      paymentMethod: 'Credit Card',
      amount: 1500,
      hasInstalment: false,
      instalmentQuantity: null,
      instalmentAmount: null,
      notes: null,
      createdAt: new Date('2024-01-25T23:43:56.849Z'),
    },
    {
      id: 'cdkbad304au3srav6rcza4ii',
      category: 'Shopping',
      paymentMethod: 'Debit Card',
      amount: 10000,
      hasInstalment: true,
      instalmentQuantity: 2,
      instalmentAmount: 5000,
      notes:
        'hola esta es una nota mas larga para probar como se ve en la tabla, la idea es que la nota no se extienda mas allá de una medida, y luego se deba pasar el mouse por encima para leer el resto',
      createdAt: new Date('2024-01-25T23:43:56.849Z'),
    },
  ];

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-right">
        <Link href="/dashboard/payment/create" className="btn-outline right-0">
          Add Payment
        </Link>
      </div>

      <PaymentTable transactions={transactions} />
    </div>
  );
};

export default Payment;
