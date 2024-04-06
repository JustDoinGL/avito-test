import styles from "./InputText.module.scss";
import { InputTextProps } from "./InputText.type";

const InputText = ({
  className,
  placeholder = "Введите текст...",
  onChange,
  value,
}: InputTextProps) => {
  return (
    <input
      type="text"
      className={`${styles.input} ${className || ""}`}
      placeholder={placeholder}
      onChange={(value) => onChange(value.target.value)}
      value={value}
    />
  );
};

export default InputText;
