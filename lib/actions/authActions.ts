'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/lib/auth';

export const login = async (prevState: any, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid username or password.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }

    // Error: NEXT_REDIRECT
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error;
  }
};

export const logOutAction = async ({ path = '/' }: { path: string }) => {
  await signOut({ redirectTo: path });
};
