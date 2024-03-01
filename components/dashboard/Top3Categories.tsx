import { getTop3Categories } from '@/lib/data';
import { toCLP } from '@/utils';

const Top3Categories = async () => {
  const top3Categories = await getTop3Categories();

  return (
    <div className="">
      <ul className="flex flex-col text-foreground/70">
        {top3Categories &&
          top3Categories.map(category => (
            <li key={category.name} className="flex justify-between items-baseline text-center">
              <h5 className="text-accent">{category.name}</h5>
              <h5 className="text-foreground/70">{toCLP(Number(category.amount))}</h5>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Top3Categories;
