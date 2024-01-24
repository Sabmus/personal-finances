import HeroPhoto from '@/components/HeroPhoto';
import { Breadcrumb, DashboardTitle } from '@/components/ui';

const Paymentlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full border-test">
      <div className="dashboard-header border-test">
        <div>
          <Breadcrumb />
          <DashboardTitle />
        </div>
        <HeroPhoto />
      </div>
      {children}
    </div>
  );
};

export default Paymentlayout;
