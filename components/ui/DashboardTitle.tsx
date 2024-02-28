'use client';
import { usePathname, useParams } from 'next/navigation';

const DashboardTitle = () => {
  const pathName = usePathname();
  const { id } = useParams();

  const pathTitle = pathName
    .split('/')
    .filter(path => path !== '' && path !== 'dashboard' && path !== id)
    .join(' - ');

  return <h5 className="leading-none capitalize">{pathTitle}</h5>;
};

export default DashboardTitle;
