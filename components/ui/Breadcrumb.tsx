'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  interface IPath {
    name: string;
    url: string;
  }

  const pathName = usePathname();
  const pathArray = pathName
    .split('/')
    .filter(path => path !== '')
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
