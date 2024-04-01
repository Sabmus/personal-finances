import { ConfigurationNav } from '@/components/configuration';

const Configurationlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-y-hidden">
      <div className="flex flex-col lg:grid grid-cols-2 grid-rows-1 gap-2 h-full">
        <div className="px-2 py-4 bg-surface">
          <h3 className="lg:mb-10">Configuration</h3>
          <ConfigurationNav />
        </div>
        <div className="h-full px-2 py-4 bg-surface overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Configurationlayout;
