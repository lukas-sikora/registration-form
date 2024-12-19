const Options = ({ arr }) => {
  return arr.map((el) => (
    <option key={el} value={el}>
      {el}
    </option>
  ));
};

export default Options;
