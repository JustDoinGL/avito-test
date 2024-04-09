import { useEffect } from "react";
import { setDisabled, setEmail, setName, setPassword, setPassword2 } from "../redux/registration/registrationSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useFormControls = () => {
  const dispatch = useAppDispatch();
  const {
    email,
    password,
    isEmail,
    isPassword,
    isName,
    isTwoPassword,
    name,
    password2,
  } = useAppSelector(store => store.registration);

  useEffect(() => {
    dispatch(setDisabled())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmail, isName, isPassword, isTwoPassword]);

  const emailControl = (value: string) => dispatch(setEmail(value));
  const nameControl = (value: string) => dispatch(setName(value));
  const passwordControl = (value: string) => dispatch(setPassword(value));
  const password2Control = (value: string) => dispatch(setPassword2(value));

  const inputFields = [
    {
      label: "Имя",
      helper: "Слишком короткое имя",
      value: name,
      type: "text",
      isRight: isName,
      onChang: nameControl,
      placeholder: "Введите ваше имя...",
    },
    {
      label: "Электронная почта",
      helper: "Некорректный email",
      value: email,
      type: "email",
      isRight: isEmail,
      onChang: emailControl,
      placeholder: "Введите вашу почту...",
    },
    {
      label: "Пароль",
      helper: "Слишком короткий пароль",
      value: password,
      type: "password",
      isRight: isPassword,
      onChang: passwordControl,
      placeholder: "Придумайте пароль",
    },
    {
      label: "Подтвердите пароль",
      helper: "Пароли не совпадают",
      value: password2,
      type: "password",
      isRight: isTwoPassword,
      onChang: password2Control,
      placeholder: "Повторите пароль",
    },
  ];

  return inputFields;
};
