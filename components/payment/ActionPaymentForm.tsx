'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { ActionPaymentFormProps } from '@/lib/definitions';

const ActionPaymentForm = ({
  formAction,
  state,
  categories,
  paymentMethods,
  transaction = undefined,
}: ActionPaymentFormProps) => {
  const [checked, setChecked] = useState(false);

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    if (transaction?.hasInstalment) {
      setChecked(true);
    }
  }, [transaction]);

  return (
    <form action={formAction} className="flex flex-col gap-2 w-1/2 mx-auto mt-10">
      <div>
        <select
          name="categoryId"
          id="categoryId"
          aria-describedby="categoryId-error"
          className="w-full"
          defaultValue={transaction?.categoryId ?? ''}
        >
          <option value="" disabled={true}>
            Select a category...
          </option>
          {categories.map((category, idx) => (
            <option key={idx} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {state.errors && state.errors.categoryId && (
          <div id="categoryId-error" className="text-red-500">
            {state.errors.categoryId}
          </div>
        )}
      </div>
      <div>
        <select
          name="paymentMethodId"
          id="paymentMethodId"
          aria-describedby="paymentMethodId-error"
          className="w-full"
          defaultValue={transaction?.paymentMethodId ?? ''}
        >
          <option value="" disabled={true}>
            Select a payment method...
          </option>
          {paymentMethods.map((paymentMethod, idx) => (
            <option key={idx} value={paymentMethod.id}>
              {paymentMethod.name}
            </option>
          ))}
        </select>
        {state.errors && state.errors?.paymentMethodId && (
          <div id="paymentMethodId-error" className="text-red-500">
            {state.errors.paymentMethodId}
          </div>
        )}
      </div>
      <div>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Amount"
          aria-describedby="amount-error"
          className="w-full"
          defaultValue={transaction?.amount ?? ''}
        />
        {state.errors && state.errors.amount && (
          <div id="amount-error" className="text-red-500">
            {state.errors.amount}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="hasInstalment" className="mr-3">
          Instalment
        </label>
        <input
          type="checkbox"
          name="hasInstalment"
          id="hasInstalment"
          onChange={e => handleChecked(e)}
          checked={checked}
        />
      </div>
      {checked && (
        <>
          <div>
            <input
              type="number"
              name="instalmentQuantity"
              id="instalmentQuantity"
              placeholder="Instalment Quantity"
              className="w-full"
              aria-describedby="instalmentQuantity-error"
              defaultValue={transaction?.instalmentQuantity ?? ''}
            />
            {state.errors && state.errors.instalmentQuantity && (
              <div id="instalmentQuantity-error" className="text-red-500">
                {state.errors.instalmentQuantity}
              </div>
            )}
          </div>
          <div>
            <input
              type="number"
              name="instalmentAmount"
              id="instalmentAmount"
              placeholder="Instalment Amount"
              className="w-full"
              aria-describedby="instalmentAmount-error"
              defaultValue={transaction?.instalmentAmount ?? ''}
            />
            {state.errors && state.errors.instalmentAmount && (
              <div id="instalmentAmount-error" className="text-red-500">
                {state.errors.instalmentAmount}
              </div>
            )}
          </div>
        </>
      )}
      <div>
        <textarea
          name="notes"
          id="notes"
          rows={4}
          placeholder="Notes"
          className="max-h-40 w-full"
          aria-describedby="notes-error"
          defaultValue={transaction?.notes ?? ''}
        ></textarea>
        {state.errors && state.errors.notes && (
          <div id="notes-error" className="text-red-500">
            {state.errors.notes}
          </div>
        )}
      </div>
      <button className="btn">Save</button>
      {state.message && <div className="text-green-500">{state.message}</div>}
    </form>
  );
};

export default ActionPaymentForm;