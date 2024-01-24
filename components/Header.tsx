import Link from 'next/link';
import Logo from '@/components/Logo';

const links = [
  {
    name: 'About',
    url: '#about',
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
  },
];

const Header = () => {
  const session = false;

  return (
    <header className="p-4 h-14 flex justify-between items-center fixed w-5/6 bg-background">
      <Logo />
      <div className="flex gap-4 items-center">
        <ul className="flex gap-8 px-4 border-r-2">
          {links &&
            links.map((link, idx) => (
              <li key={idx}>
                <Link href={link.url} className="link">
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
        {session ? (
          <Link href="/log-out" className="btn">
            Log out
          </Link>
        ) : (
          <>
            <Link href="/login" className="btn-outline">
              Log in
            </Link>
            <Link href="/register" className="btn-outline">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
