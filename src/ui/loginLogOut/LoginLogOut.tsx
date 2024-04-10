import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearToken } from "../../redux/registration/registrationSlice";
import { Button } from "antd";
import styles from "./LoginLogOut.module.scss";
import { LoginLogOutProps } from "./LoginLogOut.type";

const LoginLogOut = ({ onClick }: LoginLogOutProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((store) => store.registration);

  const handleClickExit = () => {
    dispatch(clearToken());
    navigate("/");
    if (onClick) onClick();
    // TODO: добавить удаление избранных юзеров
    // dispatch(clearFavoriteUsers());
  };

  const handleClickSignIn = () => {
    navigate("/login");
    if (onClick) onClick();
  };

  const handleClickSignUp = () => {
    navigate("/auth");
    if (onClick) onClick();
  };
  return (
    <>
      {token ? (
        <Button onClick={handleClickExit}>Выйти из аккаунта</Button>
      ) : (
        <div className={styles.container}>
          <Button onClick={handleClickSignIn}>Войти в аккаунт </Button>
          <Button onClick={handleClickSignUp}>Зарегистрироваться</Button>
        </div>
      )}
    </>
  );
};

export default LoginLogOut;
