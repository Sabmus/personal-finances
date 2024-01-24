import { Logo } from '@/components';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[20%_80%] h-svh">
      <div className="flex flex-col items-center p-4 bg-slate-500">
        <Logo />
        <div className="flex-grow flex-shrink-0 basis-auto w-full text-center mt-20 border-test">
          <ul>
            <li className="py-2">item de la lista</li>
            <li className="py-2">item de la lista</li>
            <li className="py-2">item de la lista</li>
            <li className="py-2">item de la lista</li>
          </ul>
        </div>
        <div className="flex-shrink-0">footer</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
