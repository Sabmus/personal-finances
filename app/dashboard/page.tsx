import { Suspense } from 'react';
import { TotalAmount, Top3Categories, LastTransactionsTable, LineChart, BarChart } from '@/components/dashboard';
import { Hero } from '@/components';

const Dashboard = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col h-full gap-3 md:grid md:grid-cols-12 md:grid-rows-12 md:gap-2">
        <div className="md:col-span-12 md:row-span-1">
          <div className="flex justify-between items-center">
            <span>otra barra</span>
            <Hero />
          </div>
        </div>
        <div className="md:col-span-12 md:row-span-1 px-2 py-1">
          <h3>Dashboard</h3>
        </div>

        <div className="flex flex-col md:col-span-4 md:row-span-2">
          <Suspense fallback={<span>Loading...</span>}>
            <TotalAmount />
          </Suspense>
        </div>
        <div className="md:col-span-8 md:row-span-4 bg-surface">
          <Suspense fallback={<span>Loading...</span>}>
            <LineChart />
          </Suspense>
        </div>
        <div className="flex flex-col md:col-span-4 md:row-span-2 bg-surface">
          <Suspense fallback={<span>Loading...</span>}>
            <Top3Categories />
          </Suspense>
        </div>
        <div className="md:col-span-8 md:row-span-6 bg-surface">
          <Suspense fallback={<span>Loading...</span>}>
            <LastTransactionsTable />
          </Suspense>
        </div>
        <div className="md:col-span-4 md:row-span-6 bg-surface">
          <Suspense fallback={<span>Loading...</span>}>
            <BarChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
