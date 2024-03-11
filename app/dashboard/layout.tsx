import { Hero, Logo, LogOutForm } from '@/components';
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
    <div className="flex flex-col h-svh lg:grid lg:grid-cols-[15%_85%]">
      <DashboardNav />

      <div className="hidden lg:flex lg:flex-col lg:items-center p-4 bg-surface">
        <Logo />
        <div className="flex-grow flex-shrink-0 basis-auto w-full text-center mt-20">
          <nav>
            <ul>
              {links &&
                links.map((link, idx) => (
                  <li key={idx} className="py-2 rounded-sm hover:bg-accent group">
                    <Link href={link.href} className="font-medium group-hover:text-background">
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        <div className="flex-shrink-0">
          <LogOutForm redirectTo="/" label="Log out" />
        </div>
      </div>

      <div className="flex flex-col h-full md:px-4 overflow-y-hidden py-3">
        <div className="flex justify-between items-center">
          <span>otra barra</span>
          <Hero />
        </div>
        {children}
      </div>
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
