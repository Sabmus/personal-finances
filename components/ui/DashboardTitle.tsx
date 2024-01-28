'use client';
import { usePathname, useParams } from 'next/navigation';

const DashboardTitle = () => {
  const pathName = usePathname();
  const { id } = useParams();

  const pathTitle = pathName
    .split('/')
    .filter(path => path !== '' && path !== 'dashboard' && path !== id)
    .join(' - ');

  return <h3 className="leading-none capitalize">{pathTitle}</h3>;
};

export default DashboardTitle;
