import styles from './Skeleton.module.scss'
import { SkeletonProps } from './Skeleton.type'

export const Skeleton = ({ className, width, height, radius }: SkeletonProps) => {
  const style = {
    width,
    height,
    borderRadius: radius,
  }

  return <div style={style} className={`${styles.skeleton} ${className}`}></div>
}
