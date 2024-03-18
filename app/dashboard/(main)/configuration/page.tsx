const Configuration = async () => {
  return (
    <div className="h-full flex flex-col items-center gap-4 w-2/3 mx-auto">
      <h2 className="text-foreground-secondary">Welcome to your settings</h2>
      <p className="text-foreground-secondary">
        Here you can add new categories, payment methods, groups and modify your profile data.
      </p>
      <p className="text-foreground-secondary">Click on a item from the left to begin.</p>
    </div>
  );
};

export default Configuration;
