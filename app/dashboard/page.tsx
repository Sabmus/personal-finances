const Dashboard = () => {
  return (
    <div className="h-full border-test">
      <div className="flex justify-between items-center border-test h-14">
        <h2>Dashboard</h2>
        <div className="w-10 h-10 rounded-full text-center border-test bg-blue-300"></div>
      </div>
      {/* 3.5rem of the h-14 of the abode div */}
      <div className="grid grid-rows-3 h-[calc(100%-3.5rem)]">
        <div className="p-4 flex border-test">
          <div className="p-4 flex-center flex-col border-test">
            <h1>$100.000</h1>
            <span>Total</span>
          </div>
          <div className="flex-grow p-4 border-test">
            <ul className="flex justify-around h-full items-center border-test">
              <li className="text-center">
                <h3>$50.000</h3>
                <span>Super</span>
              </li>
              <li className="text-center">
                <h3>$25.000</h3>
                <span>Cuentas</span>
              </li>
              <li className="text-center">
                <h3>$25.000</h3>
                <span>Juegos</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 border-test">
          <div className="flex-center border-test">
            <h2>quick view 1</h2>
          </div>
          <div className="flex-center border-test">
            <h2>quick view 2</h2>
          </div>
        </div>
        <div className="p-4 border-test">
          <table className="w-full h-full border-test">
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
