import { Suspense } from 'react';
import { TotalAmount, Top3Categories } from '@/components/dashboard';

const Dashboard = () => {
  return (
    <div className="h-full border-test">
      <div className="flex flex-col h-full md:grid md:grid-cols-12 md:grid-rows-12 md:gap-2">
        <div className="md:col-span-12 bg-surface">
          <h3>Dashboard</h3>
        </div>

        <div className="flex flex-col gap-2 md:col-span-3 md:row-span-2 bg-surface">
          <Suspense fallback={<span>Loading...</span>}>
            <TotalAmount />
          </Suspense>
        </div>

        <div className="flex flex-col md:col-span-9 md:row-span-2 bg-surface">
          <h6 className="text-center text-foreground/70">Top 3 Categories</h6>
          <Suspense fallback={<span>Loading...</span>}>
            <Top3Categories />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
