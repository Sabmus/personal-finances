import { ISubConfigurationProps } from '@/lib/definitions';
import { ConfigurationItem } from '@/components/configuration';

const SubConfiguration = ({ title, btnTitle, data, createAction }: ISubConfigurationProps) => {
  return (
    <div className="h-1/3 px-4 py-2">
      <div className="flex flex-col gap-2 h-full border-b border-b-blue-300">
        <div className="flex justify-between">
          <h5>{title}</h5>
          <button className="btn">{btnTitle}</button>
        </div>
        <div className="h-full grid grid-cols-3 gap-4">
          {data &&
            data.map(item => (
              <div key={item.id}>
                <ConfigurationItem item={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubConfiguration;
