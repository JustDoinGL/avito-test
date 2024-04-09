import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearToken } from "../../redux/registration/registrationSlice";
import { Button } from "antd";

const LoginLogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((store) => store.registration);

  const handleClickExit = () => {
    if (token) {
      dispatch(clearToken());
      navigate("/");
      // TODO: добавить удаление избранных юзеров
      // dispatch(clearFavoriteUsers());
    } else {
      navigate("/auth");
    }
  };
  return (
    <Button onClick={handleClickExit}>
      {token ? "Выйти из аккаунта" : `Войти в аккаунт`}
    </Button>
  );
};

export default LoginLogOut;
