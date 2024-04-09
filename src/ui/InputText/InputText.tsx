import styles from "./InputText.module.scss";
import { useState } from "react";
import { InputTextProps } from "./InputText.type";
import { EyeFilled } from "@ant-design/icons";

const InputText = ({
  type,
  value,
  className,
  onChange,
  helper,
  isRight = false,
  placeholder,
}: InputTextProps) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        type={inputType}
        className={`${styles.input} ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <div className={styles.eye} onClick={togglePasswordVisibility}>
        {type === "password" && <EyeFilled />}
      </div>

      <span className={isRight ? styles.span : styles.spanRight}>{helper}</span>
    </div>
  );
};

export default InputText;
