import { useNavigate } from 'react-router-dom'
import styles from './BackLink.module.scss'
import { BackLinkProps } from './BackLink.type'
import { ArrowLeftOutlined } from '@ant-design/icons'

const BackLink = ({ text = 'Назад', onBack, back }: BackLinkProps) => {
  const navigate = useNavigate()

  function handleBack() {
    if (back) {
      navigate(back) // используйте строку URL для навигации
      if (onBack) onBack()
    } else {
      navigate(-1) // возврат назад, если URL не предоставлен
    }
  }

  return (
    <button className={styles.button} onClick={handleBack}>
      <ArrowLeftOutlined />
      <span>{text}</span>
    </button>
  )
}

export default BackLink
