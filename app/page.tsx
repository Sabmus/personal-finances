import Link from 'next/link';

const links = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'About',
    url: '/about',
  },
];

const Home = () => {
  return (
    <div>
      <header>
        <ul>
          {links &&
            links.map((link, idx) => (
              <li key={idx}>
                <Link href={link.url}>{link.name}</Link>
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
};

export default Home;
