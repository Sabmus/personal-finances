import { getGroups, getCategories } from '@/lib/data';
import { SubConfiguration } from '@/components/configuration';
import { createCategory, editCategory, deleteCategory } from '@/lib/actions/categoryActions';

const Configuration = async () => {
  //const groups = await getGroups();
  const categories = await getCategories();

  return (
    <div className="h-full">
      <SubConfiguration
        title="Categories"
        btnTitle="Add Category"
        data={categories}
        createAction={createCategory}
        editAction={editCategory}
        deleteAction={deleteCategory}
      />
    </div>
  );
};

export default Configuration;
