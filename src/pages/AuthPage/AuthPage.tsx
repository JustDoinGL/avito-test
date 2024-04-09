
import AuthForm from "../../components/AuthForm/AuthForm";
import BackLink from "../../ui/backLink/BackLink";
import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <BackLink />
        <AuthForm />
      </div>
    </div>
  );
};

export { AuthPage };