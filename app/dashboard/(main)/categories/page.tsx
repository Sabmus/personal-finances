import { MainTable } from '@/components/ui';
import Link from 'next/link';
import { editCategory, deleteCategory } from '@/lib/actions';
import { getCategories } from '@/lib/data';

const Categories = async () => {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-right">
        <Link href="/dashboard/categories/create" className="btn-outline right-0">
          Add Category
        </Link>
      </div>

      <div className="h-full">
        <MainTable colName={'Category'} data={categories} action={editCategory} deleteAction={deleteCategory} />
      </div>
    </div>
  );
};

export default Categories;
