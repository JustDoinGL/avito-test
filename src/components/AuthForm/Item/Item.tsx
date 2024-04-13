import InputText from '../../../ui/inputText/InputText'
import styles from './Item.module.scss'
import { ItemProps } from './Item.type'

const Item = ({ label, helper, value, onChange, type, isRight, placeholder }: ItemProps) => {
  return (
    <div>
      <p className={styles.title__1111}>{label}</p>
      <InputText
        onChange={onChange}
        helper={helper}
        value={value}
        type={type}
        isRight={isRight}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Item
