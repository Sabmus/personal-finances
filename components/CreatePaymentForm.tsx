'use client';

import { useFormState } from 'react-dom';
import { ChangeEvent, useState } from 'react';
//import { Combobox } from '@/components/ui';
import { createPayment, PaymentState } from '@/lib/actions';
import { IInputObject } from '@/lib/definitions';

type CreatePaymentFormProps = {
  categories: IInputObject[];
  paymentMethods: IInputObject[];
};

const CreatePaymentForm = ({ categories, paymentMethods }: CreatePaymentFormProps) => {
  const initialFormState: PaymentState = { errors: {}, message: '' };

  const [checked, setChecked] = useState(false);
  const [state, formAction] = useFormState(createPayment, initialFormState);
  console.log('🚀 ~ CreatePaymentForm ~ state:', state);

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <form action={formAction} className="flex flex-col gap-2 w-1/2 mx-auto mt-10">
      <select name="categoryId" id="categoryId" defaultValue="" className="placeholder:text-green-500">
        <option value="" disabled={true}>
          Select a category...
        </option>
        {categories.map((category, idx) => (
          <option key={idx} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select name="paymentMethodId" id="paymentMethodId" defaultValue="" className="placeholder:text-green-500">
        <option value="" disabled={true}>
          Select a payment method...
        </option>
        {paymentMethods.map((paymentMethod, idx) => (
          <option key={idx} value={paymentMethod.id}>
            {paymentMethod.name}
          </option>
        ))}
      </select>
      {/**
      <Combobox dataArray={categories} id="categoryId" name="categoryId" className="w-full" placeholder="Category" />
      <Combobox
        dataArray={paymentMethods}
        id="paymentMethodId"
        name="paymentMethodId"
        className="w-full"
        placeholder="Payment Method"
      />
       */}

      <input type="number" name="amount" id="amount" placeholder="Amount" />
      <div>
        <label htmlFor="hasInstalment" className="mr-3">
          Instalment
        </label>
        <input type="checkbox" name="hasInstalment" id="hasInstalment" onChange={e => handleChecked(e)} />
      </div>
      {checked && (
        <>
          <input type="number" name="instalmentQuantity" id="instalmentQuantity" placeholder="Instalment Quantity" />
          <input type="number" name="instalmentAmount" id="instalmentAmount" placeholder="Instalment Amount" />
        </>
      )}

      <textarea name="notes" id="notes" rows={4} placeholder="Notes" className="max-h-40"></textarea>
      <button className="btn">Add</button>
    </form>
  );
};

export default CreatePaymentForm;
