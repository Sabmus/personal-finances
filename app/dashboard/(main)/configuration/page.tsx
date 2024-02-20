import { getGroups } from '@/lib/data';
import { SubConfiguration } from '@/components/configuration';
import { createCategory, editCategory, deleteCategory } from '@/lib/actions';

const Configuration = async () => {
  const groups = await getGroups();

  return (
    <div className="h-full">
      <SubConfiguration
        title="Categories"
        btnTitle="Add Category"
        data={groups}
        createAction={createCategory}
        editAction={editCategory}
        deleteAction={deleteCategory}
      />
    </div>
  );
};

export default Configuration;
