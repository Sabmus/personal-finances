'use client';
import { useState } from 'react';
// import { useFormState } from 'react-dom';

const UpdateConfigurationItem = ({ action, inputValue }: any) => {
  const [item, setItem] = useState(inputValue);

  const handleChange = (e: any) => {
    setItem(e.target.value);
  };

  return (
    <form action={action} className="flex w-full">
      <input type="text" value={item} onChange={e => handleChange(e)} />
      <button className="mx-auto">Save</button>
    </form>
  );
};

export default UpdateConfigurationItem;
