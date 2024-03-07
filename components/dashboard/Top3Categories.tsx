import { getTop3Categories } from '@/lib/data';
import { toCLP } from '@/utils';
import { Layers3 } from 'lucide-react';
import { NoDataError } from '@/components/dashboard';

const Top3Categories = async () => {
  const top3Categories = await getTop3Categories();

  return (
    <div className="flex flex-col h-full px-2 md:px-4 py-2">
      <div className="flex justify-between items-center text-xs mb-2">
        <span className="text-foreground-secondary">Top 3 Categories</span>
        <span className="text-foreground-secondary">
          <Layers3 size={18} />
        </span>
      </div>
      <div className="h-full grid grid-cols-3 gap-2 items-center">
        {top3Categories.data && !top3Categories.error ? (
          top3Categories.data.map(category => (
            <div key={category.name} className="h-full flex flex-col gap-1 md:justify-evenly text-center">
              <div className="flex flex-col leading-none">
                <span className="leading-none text-xs">{category.name}</span>
                <span className="text-accent sm:text-2xl md:text-clamp">{toCLP(Number(category.amount))}</span>
              </div>
              <span className="leading-none text-xs text-foreground-secondary">5% of salary</span>
            </div>
          ))
        ) : (
          <NoDataError error={top3Categories.error} />
        )}
      </div>
    </div>
  );
};

export default Top3Categories;
