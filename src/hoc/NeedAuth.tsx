import { FC, ReactElement } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

interface NeedAuthProps {
  children: ReactElement
}

const NeedAuth: FC<NeedAuthProps> = ({ children }) => {
  const location = useLocation()
  const { token } = useAppSelector((store) => store.registration)

  if (token) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children
}

export { NeedAuth }
