import Link from 'next/link';

const links = [
  {
    name: 'About',
    url: '#about',
  },
];

const Header = () => {
  return (
    <header className="h-14 flex justify-between items-center">
      <span>Logo</span>
      <ul className="flex gap-8">
        {links &&
          links.map((link, idx) => (
            <li key={idx}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
      </ul>
      <div>
        <button className="btn">log in</button>
      </div>
    </header>
  );
};

export default Header;
