import { PaymentMethods } from '@/components/configuration';

const Configuration = ({ searchParams }: { searchParams: Record<string, string> | null | undefined }) => {
  return (
    <div>
      <PaymentMethods searchParams={searchParams} />
    </div>
  );
};

export default Configuration;
