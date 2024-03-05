import { getTop3Categories } from '@/lib/data';
import { toCLP } from '@/utils';

const Top3Categories = async () => {
  const top3Categories = await getTop3Categories();

  return (
    <ul className="border-test flex flex-col h-full text-foreground/70 md:flex-row md:justify-evenly md:items-center">
      {top3Categories &&
        top3Categories.map(category => (
          <li key={category.name} className="flex justify-between items-baseline text-center md:flex-col">
            <h5 className="text-accent md:hidden">{category.name}</h5>
            <h5 className="text-foreground/70">{toCLP(Number(category.amount))}</h5>
            <h5 className="hidden text-accent md:block">{category.name}</h5>
          </li>
        ))}
    </ul>
  );
};

export default Top3Categories;
