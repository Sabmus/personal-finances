const ConfigurationItemSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="h-1/3 px-4 py-2 border-b border-b-accent-darker overflow-y-auto">
      <div className="flex flex-col gap-2">
        <div>
          <h5>{title}</h5>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-1">
          <div className="bg-gray-800 h-10 w-full px-2 py-1 rounded-sm border border-surface animate-pulse"></div>
          <div className="bg-gray-800 h-10 w-full px-2 py-1 rounded-sm border border-surface animate-pulse"></div>
          <div className="bg-gray-800 h-10 w-full px-2 py-1 rounded-sm border border-surface animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationItemSkeleton;
