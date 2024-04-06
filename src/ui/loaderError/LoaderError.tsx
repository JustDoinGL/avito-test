import styles from "./LoaderError.module.scss";
import { LoaderErrorProps } from "./LoaderError.type";

const LoaderError = ({ status }: LoaderErrorProps) => {
  return (
    <div>
      {status === "pending" && <div className={styles.loader__spinner}></div>}
      {status === "rejected" && (
        <div className={styles.error__message}>
          Произошла ошибка, пожалуйста, попробуйте еще раз.
        </div>
      )}
    </div>
  );
};

export default LoaderError;
