const NoDataError = ({ error = 'Something went wrong' }: { error: string | undefined }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <span className="text-lg text-error">{error}</span>
    </div>
  );
};

export default NoDataError;
