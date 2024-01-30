import { Header, Main } from '@/components';

const Home = () => {
  return (
    <div className="h-svh flex flex-col">
      <Header />
      <main className="bg-background flex-grow flex-shrink-0 basis-auto">
        <Main />
      </main>
      <footer className="bg-red-400 flex-shrink-0 text-center">Built with NextJs, TailwindCSS and 💖</footer>
    </div>
  );
};

export default Home;
