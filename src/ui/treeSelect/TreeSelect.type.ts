export type TreeSelectProps = {
  placeholder: string
  content: string[]
  selectedValues: string[]
  handleChange: (value: string[]) => void
  multiple: boolean
}
