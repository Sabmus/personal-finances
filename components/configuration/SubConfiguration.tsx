import { ISubConfigurationProps } from '@/lib/definitions';
import { ConfigurationItem, CreateConfigurationItem } from '@/components/configuration';

const SubConfiguration = ({
  title,
  btnTitle,
  resource,
  dataFunction,
  createAction,
  editAction,
  deleteAction,
}: ISubConfigurationProps) => {
  //const resource = await dataFunction();

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between items-center">
        <input type="text" name="search" id={title} placeholder="search..." />
        <CreateConfigurationItem action={createAction} btnTitle={btnTitle} />
      </div>

      {resource && resource.error && !resource.data && (
        <div className="text-center text-error">{resource.error}</div>
      )}

      <div className="h-full overflow-y-auto overflow-x-hidden">
        {resource &&
          resource.data &&
          !resource.error &&
          resource.data.map(item => (
            <ConfigurationItem
              key={item.id}
              isGroup={title === 'Groups'}
              item={item}
              editAction={editAction}
              deleteAction={deleteAction}
            />
          ))}
      </div>
    </div>
  );
};

export default SubConfiguration;
