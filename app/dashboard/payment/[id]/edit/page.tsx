const EditPayment = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h3>id</h3>
      <span>{params.id}</span>
    </div>
  );
};

export default EditPayment;
