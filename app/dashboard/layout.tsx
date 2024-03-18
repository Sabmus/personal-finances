import { Hero, Logo, LogOutForm } from '@/components';
import { DashboardNav, NotificationBell } from '@/components/dashboard';
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

      <div className="flex flex-col h-svh max-h-svh md:px-4 py-2 overflow-y-auto">
        <div className="flex justify-between items-center">
          <span>otra barra</span>
          <div className="flex gap-4 justify-around items-center">
            <NotificationBell />
            <Hero />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
