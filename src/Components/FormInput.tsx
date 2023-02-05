const Input = ({
  name,
  value,
  type,
  placeholder,
  handleChange,
}: {
  name: string;
  value: any;
  type: string;
  placeholder: string;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) => {
  return (
    <input
      style={{
        marginTop: "15px",
        marginBottom: "10px",
        outline: "none",
        borderBottom: "1px solid #7908ad",
      }}
      className="w-80 lg:w-full px-5 p-3 mt-3"
      name={name}
      type={type}
      required
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
export default Input;
