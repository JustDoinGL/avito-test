export type EnumValue<T> = T[keyof T];

export type DropDownMenuProps<T> = {
  enumObj: T;
  selectedValue: EnumValue<T>;
  onSelect: (value: EnumValue<T>) => void;
}