import { CreateForm } from '@/components/ui';
import { createPaymentMethod } from '@/lib/actions';

const CreatePaymentMethod = () => {
  return (
    <div className="border-test h-full">
      <CreateForm action={createPaymentMethod} />
    </div>
  );
};

export default CreatePaymentMethod;
