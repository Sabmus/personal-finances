import { SubConfiguration } from '@/components/configuration';
import { createCategory, editCategory, deleteCategory } from '@/lib/actions/categoryActions';
import { getCategories } from '@/lib/data';

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <div className="h-full">
      <SubConfiguration
        title="Categories"
        btnTitle="Add Category"
        resource={categories}
        //dataFunction={getCategories}
        createAction={createCategory}
        editAction={editCategory}
        deleteAction={deleteCategory}
      />
    </div>
  );
};

export default CategoriesPage;
