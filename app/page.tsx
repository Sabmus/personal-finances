import { Header, Main } from '@/components';
import { Github } from 'lucide-react';

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="bg-background flex-grow flex-shrink-0 basis-auto">
        <Main />
      </main>
      <footer className="py-2 flex-shrink-0 text-center flex gap-2 mx-auto">
        <Github />
        <a href="https://github.com/sabmus" target="_blank">
          Simón Muñoz Saavedra
        </a>
      </footer>
    </div>
  );
};

export default Home;
