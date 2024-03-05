import { Suspense } from 'react';
import { TotalAmount, Top3Categories } from '@/components/dashboard';

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col h-full md:grid md:grid-rows-[20%_40%_40%]">
        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-[30%_70%]">
          <div className="flex-center flex-col">
            <h1 className="text-accent">
              <Suspense fallback={<span>Loading...</span>}>
                <TotalAmount />
              </Suspense>
            </h1>
            <span>Total</span>
          </div>
          <div className="flex flex-col">
            <h6 className="text-center text-foreground/70">Top 3 Categories</h6>
            <Suspense fallback={<span>Loading...</span>}>
              <Top3Categories />
            </Suspense>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2">
          <div className="flex-center">
            <h2>quick view 1</h2>
          </div>
          <div className="flex-center">
            <h2>quick view 2</h2>
          </div>
        </div>
        <div className="p-4">
          <table className="w-full h-full">
            <thead>
              <tr>
                <th>col1</th>
                <th>col2</th>
                <th>col3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>item1</td>
                <td>item2</td>
                <td>item3</td>
              </tr>
              <tr>
                <td>item1</td>
                <td>item2</td>
                <td>item3</td>
              </tr>
              <tr>
                <td>item1</td>
                <td>item2</td>
                <td>item3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
