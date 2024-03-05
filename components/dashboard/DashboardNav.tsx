import { DashboardMenu } from '@/components/dashboard';
import { LogOutForm } from '@/components';

const DashboardNav = () => {
  return (
    <div className="flex justify-between md:hidden">
      <DashboardMenu />
      <LogOutForm />
    </div>
  );
};

export default DashboardNav;
