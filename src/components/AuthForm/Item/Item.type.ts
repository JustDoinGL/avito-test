export type ItemProps = {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  helper: string
  placeholder: string
  isRight: boolean
}
