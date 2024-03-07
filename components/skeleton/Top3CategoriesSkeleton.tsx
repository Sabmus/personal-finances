const Top3CategoriesSkeleton = () => {
  return (
    <div className="flex flex-col h-full px-2 md:px-4 py-2 skeleton">
      <div className="flex justify-between items-center mb-2">
        <div className="h-5 w-2/5 rounded-md bg-skeleton"></div>
        <div className="h-[20px] w-[22px] rounded-md bg-skeleton"></div>
      </div>
      <div className="h-full grid grid-cols-3 gap-2 items-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-full flex flex-col gap-1 md:justify-evenly">
            <div className="flex flex-col gap-1 items-center">
              <div className="h-2 w-10 bg-skeleton rounded-md"></div>
              <div className="h-8 w-28 bg-skeleton rounded-md"></div>
            </div>
            <div className="h-3 w-2/5 rounded-md mx-auto bg-skeleton"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top3CategoriesSkeleton;
