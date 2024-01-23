'use client';

import { useFormState } from 'react-dom';
import { register } from '@/lib/actions';

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="name" name="name" placeholder="Name" />
      <input type="lastName" name="lastName" placeholder="Last name" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button className="btn">create</button>
    </form>
  );
};

export default RegisterForm;
