'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

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

const DashboardMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const divRef = useRef(null);

  const handleMenuClick = () => {
    setIsOpenMenu(prev => !prev);
  };

  useOnClickOutside(divRef, () => setIsOpenMenu(false));

  return (
    <div ref={divRef} className="relative flex items-center">
      <div
        className={`absolute z-30 transition-all duration-200 ${
          isOpenMenu ? 'left-16 delay-75' : 'left-0'
        }`}
      >
        <Menu onClick={handleMenuClick} />
      </div>
      <div
        className={`absolute w-[200px] z-20 flex flex-col top-0 h-svh transition-all duration-200 ease-in ${
          isOpenMenu ? '-left-7' : '-left-64'
        } bg-background/95`}
      >
        <div className="flex-grow flex-shrink-0 basis-auto w-full text-center">
          <ul className="h-full flex flex-col justify-center">
            {links &&
              links.map((link, idx) => (
                <li key={idx} className="py-2">
                  <Link href={link.href} onClick={handleMenuClick}>
                    {link.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex-shrink-0 text-center">
          <span>
            built with{' '}
            <a href="https://nextjs.org/" target="_blank" rel="noopener">
              NextJs
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
