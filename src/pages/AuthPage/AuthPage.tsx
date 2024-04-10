import AuthForm from "../../components/AuthForm/AuthForm";
import { useAppDispatch } from "../../hooks/redux";
import { clearToken } from "../../redux/registration/registrationSlice";
import BackLink from "../../ui/backLink/BackLink";
import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(clearToken());
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <BackLink onBack={handleClick} />
        <AuthForm form="registration" />
      </div>
    </div>
  );
};

export { AuthPage };
