import { ReactNode } from "react"

export type ModalUIProps = {
  children: ReactNode
  open: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
  title: string
  submitForm: () => void
}