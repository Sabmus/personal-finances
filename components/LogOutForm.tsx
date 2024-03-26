import { signOut } from '@/lib/auth';
// import { logOutAction } from '@/lib/actions/authActions';
import { LogOut } from 'lucide-react';

const LogOutForm = ({ redirectTo = '/', label }: { redirectTo?: string; label?: string }) => {
  // const logOutBinded = logOutAction.bind(null, { path: redirectTo });

  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo,
        });
      }}
    >
      <button className="btn py-1">{label ? <span>{label}</span> : <LogOut size={18} />}</button>
    </form>
  );
};

export default LogOutForm;
