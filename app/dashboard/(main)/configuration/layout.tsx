import { ConfigurationNav } from '@/components/configuration';

const Configurationlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-y-hidden">
      <div className="grid grid-cols-2 grid-rows-1 gap-2 h-full">
        <div className="px-2 py-4 bg-surface">
          <h3 className="mb-10">Configuration</h3>
          <ConfigurationNav />
        </div>
        <div className="px-2 py-4 bg-surface">{children}</div>
      </div>
    </div>
  );
};

export default Configurationlayout;
