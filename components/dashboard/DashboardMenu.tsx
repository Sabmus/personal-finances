'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Transactions',
    href: '/dashboard/payment',
  },
  {
    name: 'Configuration',
    href: '/dashboard/configuration',
  },
];

const DashboardMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleMenuClick = () => {
    setIsOpenMenu(prev => !prev);
  };

  return (
    <div className="flex flex-col px-4 py-2 bg-slate-500">
      <div>
        <span>
          <Menu onClick={handleMenuClick} />
        </span>
      </div>
      {isOpenMenu && (
        <>
          <div className="flex-grow flex-shrink-0 basis-auto w-full text-center border-test">
            <ul>
              {links &&
                links.map((link, idx) => (
                  <li key={idx} className="py-2">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex-shrink-0 text-center">footer</div>
        </>
      )}
    </div>
  );
};

export default DashboardMenu;
