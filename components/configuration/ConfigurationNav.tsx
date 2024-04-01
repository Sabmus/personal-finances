'use client';

import Link from 'next/link';
import { configurationList } from '@/utils';
import { usePathname } from 'next/navigation';

const ConfigurationNav = () => {
  const pathName = usePathname().replace('/dashboard/configuration/', '');

  return (
    <nav className="p-2">
      <ul className="flex overflow-x-auto snap-x lg:block">
        {configurationList &&
          configurationList.map((item, index) => (
            <Link key={index} href={`/dashboard/configuration/${item.href}`}>
              <li
                className={`link hover:cursor-pointer h-8 lg:h-14 flex items-center px-4 rounded-md text-nowrap snap-center ${
                  item.href === pathName
                    ? 'bg-background border-r-4 border-r-accent'
                    : 'hover:bg-background/45'
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
      </ul>
    </nav>
  );
};

export default ConfigurationNav;
