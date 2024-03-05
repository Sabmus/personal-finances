import { Logo } from '@/components';
import { DashboardNav } from '@/components/dashboard';
import Link from 'next/link';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      name: 'Dashboard',
      href: '/dashboard',
    },
    {
      name: 'Transactions',
      href: '/dashboard/transactions',
    },
    {
      name: 'Configuration',
      href: '/dashboard/configuration',
    },
  ];

  return (
    <div className="flex flex-col h-svh md:grid md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%]">
      <DashboardNav />

      <div className="hidden md:flex md:flex-col md:items-center p-4 bg-slate-500">
        <Logo />
        <div className="flex-grow flex-shrink-0 basis-auto w-full text-center mt-20">
          <ul>
            {links &&
              links.map((link, idx) => (
                <li key={idx} className="py-2">
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex-shrink-0">
          <span>
            built with{' '}
            <a href="https://nextjs.org/" target="_blank" rel="noopener">
              NextJs
            </a>
          </span>
        </div>
      </div>

      <div className="h-full md:p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;

{
  /* <div className="grid grid-cols-[20%_80%] h-svh">
      <div className="flex flex-col items-center p-4 bg-slate-500">
        <Logo />
        <div className="flex-grow flex-shrink-0 basis-auto w-full text-center mt-20 border-test">
          <ul>
            {links &&
              links.map((link, idx) => (
                <li key={idx} className="py-2">
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex-shrink-0">footer</div>
      </div>
      <div className="p-4">{children}</div>
    </div> */
}
