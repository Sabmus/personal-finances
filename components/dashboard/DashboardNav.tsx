import { DashboardMenu } from '@/components/dashboard';
import { Hero } from '@/components';

const DashboardNav = () => {
  return (
    <div className="flex justify-between w-full md:hidden">
      <DashboardMenu />
      <Hero />
    </div>
  );
};

export default DashboardNav;
