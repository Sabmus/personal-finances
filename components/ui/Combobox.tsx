type TDataArray = string[];

const Combobox = ({ dataArray }: { dataArray: TDataArray }) => {
  return (
    <select name="category" id="category">
      {dataArray.map((item, idx) => (
        <option key={idx} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Combobox;
