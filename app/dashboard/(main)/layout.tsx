import { Breadcrumb } from '@/components/ui';

const Paymentlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <Breadcrumb />
      {children}
    </div>
  );
};

export default Paymentlayout;
