import Link from 'next/link';

const Payment = () => {
  return (
    <div className="h-full relative border-test">
      <Link href="/dashboard/payment/create" className="btn-outline absolute right-0">
        Add Payment
      </Link>
    </div>
  );
};

export default Payment;
