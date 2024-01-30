import Link from 'next/link';
import Logo from '@/components/Logo';
import { auth } from '@/lib/auth';

const links = [
  {
    name: 'About',
    url: '#about',
  },
];

const Header = async () => {
  const session = await auth();

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
          {session && (
            <li>
              <Link href="/dashboard" className="link">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/" className="btn">
            Log out
          </Link>
        ) : (
          <Link href="/api/auth/signin?callbackUrl=/" className="btn-outline">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
