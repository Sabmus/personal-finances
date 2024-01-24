'use client';
import { usePathname } from 'next/navigation';

const DashboardTitle = () => {
  const pathName = usePathname();
  const pathTitle = pathName
    .split('/')
    .filter(path => path !== '' && path !== 'dashboard')
    .join(' - ');

  return <h3 className="leading-none capitalize">{pathTitle}</h3>;
};

export default DashboardTitle;
