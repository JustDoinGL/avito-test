import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchRegistration } from "../../redux/registration/getRegistration";
import styles from "./AuthForm.module.scss";
import Item from "./Item/Item";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../../redux/registration/registrationSlice";
import { Status } from "../../redux/@types/enum";
import { useFormControls } from "../../hooks/useFormControls";
import { Modal } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import ErrorMessage from "../../ui/errorMessage/ErrorMessage";


const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { disabled, email, password, status } = useAppSelector(
    (state) => state.registration
  );

  const handleSubmit = (e: FormEvent) => {
    dispatch(isLoading());
    e.preventDefault();
    dispatch(fetchRegistration({ email, password }));
    navigate("/catalog", { replace: true });
  };

  const inputFields = useFormControls();

  return (
    <>
      <form className={styles.form} typeof="submit">
        <h1 className={styles.title}>Регистрация</h1>
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
            onChange={field.onChang}
            title={field.label}
            key={index}
          />
        ))}

        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={disabled}
        >
          Зарегистрироваться
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
