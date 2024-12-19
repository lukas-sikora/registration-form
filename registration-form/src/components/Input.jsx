import { useFormContext } from "react-hook-form";
import s from "./Input.module.css";

const Input = ({ type = "text", name, placeholder }) => {
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;
  return (
    <div className={s.inputContainer}>
      <input
        className={s.inputField}
        type={type}
        {...register(name)}
        placeholder={placeholder}
      ></input>
      <div>
      {errors[name] && <p>{errors[name]?.message}</p>}
    </div>
    </div>
  );
};

export default Input;
