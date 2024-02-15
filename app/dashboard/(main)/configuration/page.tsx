import { getGroups } from '@/lib/data';
import { SubConfiguration } from '@/components/configuration';

const Configuration = async () => {
  const groups = await getGroups();

  return (
    <div className="border-test h-full">
      <SubConfiguration title="Categories" btnTitle="Add Category" data={groups} createAction={() => {}} />
    </div>
  );
};

export default Configuration;
