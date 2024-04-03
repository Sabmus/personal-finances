const Main = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center gap-4">
        <div>
          <h1>Personal Finances App</h1>
          <p>in progress...</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <ol className="list-decimal">
            <li>first, log into the app (currently with google and github)</li>
            <li>
              then, go to configuration section and add your fist category* and payment method**
            </li>
            <li>now you can start adding transactions (your expenses)</li>
            <li>check the dashbaord section to see how much you are spending in each category</li>
          </ol>
          <div className="flex flex-col text-foreground-secondary text-sm">
            <span>
              *: category of your expenses. i.e: food, transportation, entertainment, etc.{' '}
            </span>
            <span>
              **: which payment method you use. i.e: debit card, credit card, cash, others. (no card
              info required, just names){' '}
            </span>
          </div>
        </div>
      </section>
      <section id="about" className="bg-green-700 flex flex-col justify-center gap-4">
        <h1>About</h1>
        <p>
          In this app you can track your expenses, and have an idea of how much of your budget it
          represent.
        </p>
        <p>
          This app was built with NextJs, TailwindCSS and Turso. It uses AuthJS for authentication,
          Turso for database and Vercel for deployment.
        </p>
      </section>
    </>
  );
};

export default Main;
