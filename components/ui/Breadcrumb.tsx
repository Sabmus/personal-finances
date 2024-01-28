'use client';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { IPath } from '@/lib/definitions';

const Breadcrumb = () => {
  const pathName = usePathname();
  const { id } = useParams();

  const pathArray = pathName
    .split('/')
    .filter(path => path !== '' && path !== id)
    .slice(0, -1) // remove last element
    .reduce((acc: IPath[], curr, idx) => {
      const path = acc[idx - 1] ? { name: curr, url: `${acc[idx - 1].url}/${curr}` } : { name: curr, url: `/${curr}` };
      acc.push(path);
      return acc;
    }, []);

  return (
    <ul>
      {pathArray.map((path, idx) => (
        <li key={idx} className="inline-block mr-3">
          <Link href={path.url}>{`/` + path.name}</Link>&nbsp;
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
