import styles from "./LoaderError.module.scss";
import { LoaderErrorProps } from "./LoaderError.type";

const LoaderError = ({ status, isFull }: LoaderErrorProps) => {
  return (
    <div>
      {status === "pending" && <div className={styles.loader__spinner}></div>}
      {status === "rejected" && (
        <div className={styles.error__message}>
          Произошла ошибка, пожалуйста, попробуйте еще раз.
        </div>
      )}
      {isFull && <p className="text">Контнетн закончился</p>}
    </div>
  );
};

export default LoaderError;
