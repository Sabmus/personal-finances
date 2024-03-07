const TotalAmountSkeleton = () => {
  return (
    <div className="h-full bg-surface rounded-sm px-2 md:px-4 py-2 skeleton">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-center">
          <div className="h-5 w-2/5 rounded-md bg-skeleton"></div>
          <div className="h-[20px] w-[22px] rounded-md bg-skeleton"></div>
        </div>
        <div>
          <div className="h-10 w-3/4 rounded-md mx-auto bg-skeleton"></div>
        </div>
        <div className="w-2/3 mx-auto">
          <div className="h-3 w-2/5 rounded-md mx-auto bg-skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default TotalAmountSkeleton;
