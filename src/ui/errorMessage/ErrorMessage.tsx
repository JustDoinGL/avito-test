import styles from "./ErrorMessage.module.scss";
import { ErrorMessageProps } from "./ErrorMessage.type";

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <div className={styles.error}>{errorMessage}</div>;
};

export default ErrorMessage;