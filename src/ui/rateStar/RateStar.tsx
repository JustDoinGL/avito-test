import { Rate } from 'antd'
import { RateStarProps } from './RateStar.type'
import { useAppSelector } from '../../hooks/redux'
import styles from './RateStar.module.scss'

const RateStar = ({ rate, count = 10 }: RateStarProps) => {
  const { value: theme } = useAppSelector((store) => store.theme)
  return (
    <Rate allowHalf className={theme === 'dark' ? `${styles.dark}` : ''} defaultValue={rate} disabled count={count} />
  )
}

export default RateStar
