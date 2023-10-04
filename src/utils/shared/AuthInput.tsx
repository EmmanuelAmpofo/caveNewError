import { InputProps } from "../helpers/interfaces/InputProps";

const AuthInput: React.FC<InputProps> = ({
  id,
  placeholder,
  value,
  type,
  onChange,
  className
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ id, value: event.target.value });
  };
  return (
    <div>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={type}
        className={`${className} w-full my-[10px] h-[35px] p-[10px] rounded-lg bg-[#e9e9e9] outline-none`}
      />
    </div>
  );
};

export default AuthInput;
