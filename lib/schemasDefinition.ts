import { z } from 'zod';

export const PaymentSchema = z
  .object({
    categoryId: z
      .string({
        invalid_type_error: 'Category is required.',
      })
      .min(1, { message: 'Category is required.' })
      .cuid2(),
    paymentMethodId: z
      .string({
        invalid_type_error: 'Payment method is required.',
      })
      .min(1, { message: 'Payment method is required.' })
      .cuid2(),
    amount: z.coerce.number().positive({
      message: 'Amount is required.',
    }),
    hasInstalment: z.union([z.literal('on'), z.null()]),
    instalmentQuantity: z.union([
      z.null(),
      z.coerce.number().int().positive({
        message: 'Instalment quantity is required.',
      }),
    ]),
    instalmentAmount: z.union([
      z.null(),
      z.coerce.number().positive({
        message: 'Instalment amount is required.',
      }),
    ]),
    notes: z
      .string()
      .max(120, {
        message: 'Notes must be less than 120 characters.',
      })
      .transform(value => (value === '' ? null : value)),
  })
  .refine(input => {
    if (input.hasInstalment === 'on' && (!input.instalmentAmount || !input.instalmentQuantity)) {
      return false;
    }

    return true;
  })
  .refine(
    input => {
      if (input.instalmentQuantity && input.instalmentAmount) {
        const totalInstalment = input.instalmentAmount * input.instalmentQuantity;
        if (totalInstalment !== input.amount) {
          return false;
        }
      }

      return true;
    },
    {
      message: 'Instalment amount and quantity must be equal to the total amount.',
      path: ['instalmentAmount'],
    }
  );

export const CategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Category name is required.',
    })
    .min(1, { message: 'Category name is required.' })
    .max(36, { message: 'Category name must be less than 36 characters.' }),
});

export const PaymentMethodSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Payment Method name is required.',
    })
    .min(1, { message: 'Payment Method name is required.' })
    .max(20, { message: 'Payment Method name must be less than 20 characters.' }),
});

export const GroupSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Group name is required.',
    })
    .min(1, { message: 'Group name is required.' })
    .max(30, { message: 'Group name must be less than 30 characters.' }),
  description: z
    .string()
    .max(120, {
      message: 'Description must be less than 120 characters.',
    })
    .transform(value => (value === '' ? null : value))
    .nullable(),
});
