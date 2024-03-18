import { getGroupData } from '@/lib/data';
import { MemberInviteForm } from '@/components/configuration';

const GroupPage = async ({ params }: { params: { id: string } }) => {
  const groupData = await getGroupData(params.id);

  return (
    <div className="h-full flex flex-col gap-2">
      <h3>{groupData?.data?.results && groupData.data.results[0]?.groupName}</h3>
      <div className="flex justify-between items-center h-10">
        <h4>Members</h4>
        <MemberInviteForm ownerEmail={groupData?.data?.ownerEmail!} groupId={params.id} />
      </div>
      <ul>
        {groupData?.data?.results &&
          groupData.data.results.map((item, index) => <li key={index}>{item.members}</li>)}
      </ul>
    </div>
  );
};

export default GroupPage;
