import { Image, Table } from 'antd'
import { useWindowWidth } from '../../../../hooks/useResize'
import { ActorsCardProps } from './ActorsCard.type'
import styles from './ActorsCard.module.scss'
import { useAppSelector } from '../../../../hooks/redux'

const ActorsCard = ({ film }: ActorsCardProps) => {
  const windowWidth = useWindowWidth()
  const { value: theme } = useAppSelector((state) => state.theme)
  const hasPagination = film.persons.length > 10

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: 'Фото',
      dataIndex: 'photo',
      key: 'photo',
      render: (text: string) => <Image width={windowWidth > 420 ? 80 : 40} src={text} />,
    },
    {
      title: 'Профессия',
      dataIndex: 'profession',
      key: 'profession',
      render: (text: string) => <p>{text}</p>,
    },
  ]

  const dataSourceWithKeys = film.persons.map((person, index) => ({
    key: index,
    ...person,
  }))

  return (
    <div className={styles.persons}>
      <h2 className='h2'>Актеры:</h2>
      <Table
        dataSource={dataSourceWithKeys}
        columns={columns}
        pagination={hasPagination ? { pageSize: 10, position: ['bottomCenter'] } : false}
        className={theme === 'dark' ? `${styles.dark}` : ''}
      />
    </div>
  )
}

export default ActorsCard
