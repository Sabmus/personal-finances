const LastTransactionsTableSkeleton = () => {
  return (
    <div className="h-full px-1 md:px-4 overflow-y-auto">
      <table className="text-foreground-secondary w-full bg-surface text-table-clamp">
        <thead className="sticky top-0 bg-surface">
          <tr className="text-left text-foreground/70">
            <th scope="col" className="py-2 md:w-52">
              Date
            </th>
            <th scope="col" className="py-2 md:w-64">
              Category
            </th>
            <th scope="col" className="py-2 md:w-40">
              Payment Method
            </th>
            <th scope="col" className="py-2">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="border-b border-b-accent-darker">
              <td className="py-2">
                <div className="h-8 bg-skeleton rounded-md mr-1 skeleton"></div>
              </td>
              <td className="py-2">
                <div className="h-8 bg-skeleton rounded-md mx-1 skeleton"></div>
              </td>
              <td className="py-2">
                <div className="h-8 bg-skeleton rounded-md mx-1 skeleton"></div>
              </td>
              <td className="py-2">
                <div className="h-8 bg-skeleton rounded-md ml-1 skeleton"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LastTransactionsTableSkeleton;
