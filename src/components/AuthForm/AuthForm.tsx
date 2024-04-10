import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchRegistration } from "../../redux/registration/getRegistration";
import styles from "./AuthForm.module.scss";
import Item from "./Item/Item";
import { useNavigate } from "react-router-dom";
import {
  isLoading,
  setAddNewUser,
  setIsWrongPassOrLogin,
} from "../../redux/registration/registrationSlice";
import { Status } from "../../redux/@types/enum";
import { useFormControls } from "../../hooks/useFormControls";
import { Modal } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import ErrorMessage from "../../ui/errorMessage/ErrorMessage";
import { AuthFormProps } from "./AuthForm.type";

const AuthForm = ({ form }: AuthFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    disabled,
    email,
    password,
    status,
    usersLogin,
    isWrongPasswordOrLogin,
  } = useAppSelector((state) => state.registration);

  const handleSubmit = (e: FormEvent) => {
    dispatch(isLoading());
    e.preventDefault();
    if (form === "registration") {
      dispatch(fetchRegistration({ email, password }));
      dispatch(setAddNewUser({ login: email, password }));
      navigate("/", { replace: true });
    } else if (
      usersLogin.some(
        (user) => user.login === email && user.password === password
      )
    ) {
      dispatch(fetchRegistration({ email, password }));
      navigate("/", { replace: true });
    } else {
      dispatch(setIsWrongPassOrLogin(true));
    }
  };

  const inputFields = useFormControls(form);

  return (
    <>
      <form className={styles.form} typeof="submit">
        <h1 className={styles.title}>
          {form === "registration" ? "Регистрация" : "Вход"}
        </h1>
        {status === Status.rejected && (
          <ErrorMessage errorMessage={"Произошла ошибка"} />
        )}

        {inputFields.map((field, index) => (
          <Item
            helper={field.helper}
            value={field.value}
            type={field.type}
            isRight={field.isRight}
            placeholder={field.placeholder}
            onChange={field.onChange}
            title={field.label}
            key={index}
          />
        ))}

        {isWrongPasswordOrLogin && (
          <ErrorMessage errorMessage="Неправильная почта или пароль" />
        )}

        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={disabled}
        >
          {form === "registration" ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>

      {status === Status.pending && (
        <Modal>
          <Loading3QuartersOutlined width={50} height={50} />
        </Modal>
      )}
    </>
  );
};

export default AuthForm;
