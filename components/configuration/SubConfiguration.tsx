import { ISubConfigurationProps } from '@/lib/definitions';
import { ConfigurationItem, CreateConfigurationItem } from '@/components/configuration';

const SubConfiguration = ({
  title,
  btnTitle,
  data,
  createAction,
  editAction,
  deleteAction,
}: ISubConfigurationProps) => {
  return (
    <div className="h-1/3 px-4 py-2 border-b border-b-accent-darker overflow-y-auto">
      <div className="flex flex-col gap-2">
        <div>
          <h5>{title}</h5>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-1">
          {data &&
            data.map(item => (
              <ConfigurationItem key={item.id} item={item} editAction={editAction} deleteAction={deleteAction} />
            ))}
          <CreateConfigurationItem action={createAction} btnTitle={btnTitle} />
        </div>
      </div>
    </div>
  );
};

export default SubConfiguration;
