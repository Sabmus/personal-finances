import { ISubConfigurationProps } from '@/lib/definitions';
import { ConfigurationItem, CreateConfigurationItem } from '@/components/configuration';

const SubConfiguration = async ({
  title,
  btnTitle,
  dataFunction,
  createAction,
  editAction,
  deleteAction,
}: ISubConfigurationProps) => {
  const result = await dataFunction();

  return (
    <div className="flex flex-col h-1/3 py-2 border-b border-b-accent-darker">
      <h5 className="text-center text-accent-darker">{title}</h5>
      {result.error && <div className="text-center text-error">{result.error}</div>}
      <div className="overflow-y-auto">
        <div className="flex flex-col gap-2">
          <div className="overflow-x-hidden">
            {/* grid grid-cols-1 gap-x-4 gap-y-1 */}
            {result.data &&
              result.data.map(item => (
                <ConfigurationItem key={item.id} item={item} editAction={editAction} deleteAction={deleteAction} />
              ))}
            <CreateConfigurationItem action={createAction} btnTitle={btnTitle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubConfiguration;
