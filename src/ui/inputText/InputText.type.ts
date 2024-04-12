export type InputTextProps = {
  type: string,
  className?: string
  value: string,
  onChange: (value: string) => void
  helper?: string
  placeholder: string
  isRight?: boolean
}