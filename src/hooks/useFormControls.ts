import { useEffect, useMemo } from 'react'
import { setDisabled, setEmail, setName, setPassword, setPassword2 } from '../redux/registration/registrationSlice'
import { useAppDispatch, useAppSelector } from './redux'
import { TForm } from '../components/AuthForm/AuthForm.type'

export const useFormControls = (form: TForm) => {
  const dispatch = useAppDispatch()
  const { email, password, isEmail, isPassword, isName, isTwoPassword, name, password2 } = useAppSelector(
    (store) => store.registration,
  )

  useEffect(() => {
    dispatch(setDisabled(form))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmail, isName, isPassword, isTwoPassword])

  const emailControl = (value: string) => dispatch(setEmail(value))
  const nameControl = (value: string) => dispatch(setName(value))
  const passwordControl = (value: string) => dispatch(setPassword(value))
  const password2Control = (value: string) => dispatch(setPassword2(value))

  const inputFields = useMemo(
    () => [
      {
        label: 'Имя',
        helper: 'Слишком короткое имя',
        value: name,
        type: 'text',
        isRight: isName,
        onChange: nameControl,
        placeholder: 'Введите ваше имя...',
      },
      {
        label: 'Электронная почта',
        helper: 'Некорректный email',
        value: email,
        type: 'email',
        isRight: isEmail,
        onChange: emailControl,
        placeholder: 'Введите вашу почту...',
      },
      {
        label: 'Пароль',
        helper: 'Слишком короткий пароль',
        value: password,
        type: 'password',
        isRight: isPassword,
        onChange: passwordControl,
        placeholder: 'Придумайте пароль',
      },
      {
        label: 'Подтвердите пароль',
        helper: 'Пароли не совпадают',
        value: password2,
        type: 'password',
        isRight: isTwoPassword,
        onChange: password2Control,
        placeholder: 'Повторите пароль',
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    [name, isName, email, isEmail, password, isPassword, password2, isTwoPassword],
  )

  if (form === 'registration') {
    return inputFields
  } else {
    return [inputFields[1], inputFields[2]]
  }
}
