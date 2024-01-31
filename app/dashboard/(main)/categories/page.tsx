import { MainTable } from '@/components/ui';
import Link from 'next/link';
import { editCategory } from '@/lib/actions';
import { getCategories } from '@/lib/data';

const Categories = async () => {
  const categories = await getCategories();
  /*   const categories = [
    { id: 'uq2zwvofvsloq4rbbkp2bx70', name: 'Food' },
    { id: 'dp8agidtdrjv1ldsycmtbgez', name: 'Transport' },
    { id: 'bi802j5f4nnam6oyn31iw5ru', name: 'Entertainment' },
    { id: 'pz9n55gtzfzroy746pei19du', name: 'Shopping' },
    { id: 'l9j1oxb3lh8nzkgzlxmzs849', name: 'Bills' },
    { id: 'i0mpcjymszq8tleuduqylf76', name: 'Others' },
  ]; */

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-right">
        <Link href="/dashboard/categories/create" className="btn-outline right-0">
          Add Category
        </Link>
      </div>

      <div className="h-full">
        <MainTable colName={'Category'} data={categories} action={editCategory} />
      </div>
    </div>
  );
};

export default Categories;
