import { getGroupData } from '@/lib/data';

const GroupPage = async ({ params }: { params: { id: string } }) => {
  const groupData = await getGroupData(params.id);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3>nombre del grupo</h3>
        <button className="btn-outline">Add friends</button>
      </div>
      <div>
        <h4>Members</h4>
        <ul>
          <li>Member 1</li>
          <li>Member 2</li>
          <li>Member 3</li>
        </ul>
      </div>
    </div>
  );
};

export default GroupPage;
