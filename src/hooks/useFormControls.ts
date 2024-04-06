// import { useEffect } from "react";
// import { setDisabled, setEmail, setName, setPassword, setPassword2 } from "../redux/registration/registrationSlice";
// import { getRegistrationSelector } from "../redux/registration/selector";
// import { useAppDispatch, useAppSelector } from "./redux";

// export const useFormControls = () => {
//   const dispatch = useAppDispatch();
//   const {
//     email,
//     password,
//     isEmail,
//     isPassword,
//     isName,
//     isTwoPassword,
//     name,
//     password2,
//   } = useAppSelector(getRegistrationSelector);

//   useEffect(() => {
//     dispatch(setDisabled())
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isEmail, isName, isPassword, isTwoPassword]);

//   const emailControl = (e: string) => dispatch(setEmail(e));
//   const nameControl = (e: string) => dispatch(setName(e));
//   const passwordControl = (e: string) => dispatch(setPassword(e));
//   const password2Control = (e: string) => dispatch(setPassword2(e));

//   const inputFields = [
//     {
//       label: "Имя",
//       helper: "Слишком короткое имя",
//       value: name,
//       type: "text",
//       isRight: isName,
//       handleChange: nameControl,
//       placeholder: "Введите ваше имя...",
//     },
//     {
//       label: "Электронная почта",
//       helper: "Некорректный email",
//       value: email,
//       type: "email",
//       isRight: isEmail,
//       handleChange: emailControl,
//       placeholder: "Введите вашу почту...",
//     },
//     {
//       label: "Пароль",
//       helper: "Слишком короткий пароль",
//       value: password,
//       type: "password",
//       isRight: isPassword,
//       handleChange: passwordControl,
//       placeholder: "Придумайте пароль",
//     },
//     {
//       label: "Подтвердите пароль",
//       helper: "Пароли не совпадают",
//       value: password2,
//       type: "password",
//       isRight: isTwoPassword,
//       handleChange: password2Control,
//       placeholder: "Повторите пароль",
//     },
//   ];

//   return inputFields;
// };

export { }