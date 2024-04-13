export type ItemProps = {
  title: string
  type: string
  value: string
  onChange: (value: string) => void
  helper: string
  placeholder: string
  isRight: boolean
}
