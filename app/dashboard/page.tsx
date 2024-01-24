import { HeroPhoto } from '@/components';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <HeroPhoto />
      </div>
      {/* 3.5rem of the h-14 of the abode div */}
      <div className="grid grid-rows-[20%_40%_40%] h-full">
        <div className="flex">
          <div className="p-4 w-1/3 flex-center flex-col">
            <h1 className="text-accent">$100.000</h1>
            <span>Total</span>
          </div>
          <div className="flex-grow p-2">
            <h6 className="text-center mb-4 text-foreground/70">Top 3</h6>
            <ul className="flex justify-around text-foreground/70 items-center">
              <li className="text-center">
                <h5 className="text-foreground/70">$50.000</h5>
                <span>Super</span>
              </li>
              <li className="text-center">
                <h5 className="text-foreground/70">$25.000</h5>
                <span>Cuentas</span>
              </li>
              <li className="text-center">
                <h5 className="text-foreground/70">$25.000</h5>
                <span>Juegos</span>
              </li>
            </ul>
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
