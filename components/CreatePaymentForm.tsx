'use client';
import { useFormState } from 'react-dom';
import { Combobox } from '@/components/ui';

type CreatePaymentFormProps = {
  categories: string[];
  paymentMethods: string[];
};

const CreatePaymentForm = ({ categories, paymentMethods }: CreatePaymentFormProps) => {
  return (
    <form action="" className="flex flex-col gap-2 w-1/2 mx-auto mt-10">
      <Combobox dataArray={categories} />
      <input type="text" name="paymentMethod" id="paymentMethod" placeholder="Payment Method" />
      <input type="number" name="amount" id="amount" placeholder="Amount" />
      <div>
        <label htmlFor="hasInstalment" className="mr-3">
          Instalment
        </label>
        <input type="checkbox" name="hasInstalment" id="hasInstalment" />
      </div>
      <input type="number" name="instalmentQuantity" id="instalmentQuantity" placeholder="Instalment Quantity" />
      <input type="number" name="instalmentAmount" id="instalmentAmount" placeholder="Instalment Amount" />
      <textarea name="notes" id="notes" rows={4} placeholder="Notes" className="max-h-40"></textarea>
      <button className="btn">Add</button>
    </form>
  );
};

export default CreatePaymentForm;
