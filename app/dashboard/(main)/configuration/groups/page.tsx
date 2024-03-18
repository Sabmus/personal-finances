import { SubConfiguration } from '@/components/configuration';
import { createGroup, editGroup, deleteGroup } from '@/lib/actions/groupActions';
import { getGroups } from '@/lib/data';

const GroupsPage = async () => {
  const groups = await getGroups();

  return (
    <div className="h-full">
      <SubConfiguration
        title="Groups"
        btnTitle="Add new group"
        resource={groups}
        //dataFunction={getGroups}
        createAction={createGroup}
        editAction={editGroup}
        deleteAction={deleteGroup}
      />
    </div>
  );
};

export default GroupsPage;
