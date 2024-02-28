import { getTop3Categories } from '@/lib/data';
import { toCLP } from '@/utils';

const Top3Categories = async () => {
  const top3Categories = await getTop3Categories();

  return (
    <ul className="flex justify-around text-foreground/70 items-center">
      {top3Categories &&
        top3Categories.map(category => (
          <li key={category.name} className="text-center">
            <h5 className="text-foreground/70">{toCLP(Number(category.amount))}</h5>
            <span>{category.name}</span>
          </li>
        ))}
    </ul>
  );
};

export default Top3Categories;
