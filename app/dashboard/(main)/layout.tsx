import { Breadcrumb, DashboardTitle } from '@/components/ui';

const Paymentlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="dashboard-header">
        <div>
          <Breadcrumb />
          <DashboardTitle />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Paymentlayout;
