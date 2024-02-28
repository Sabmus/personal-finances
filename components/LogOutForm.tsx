import { signOut } from '@/lib/auth';
import { LogOut } from 'lucide-react';

const LogOutForm = ({ redirectTo }: { redirectTo: string | undefined }) => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo,
        });
      }}
    >
      <button className="btn py-1">
        <LogOut size={18} />
      </button>
    </form>
  );
};

export default LogOutForm;
