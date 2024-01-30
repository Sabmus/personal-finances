import { signOut } from '@/lib/auth';

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
      <button className="btn">Log Out</button>
    </form>
  );
};

export default LogOutForm;
