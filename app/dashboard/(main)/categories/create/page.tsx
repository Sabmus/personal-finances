import { CreateForm } from '@/components/ui';
import { createCategory } from '@/lib/actions';

const CreateCategory = () => {
  return (
    <div className="border-test h-full">
      <CreateForm action={createCategory} />
    </div>
  );
};

export default CreateCategory;
