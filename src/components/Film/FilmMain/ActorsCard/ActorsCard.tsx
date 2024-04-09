import { Image, Table } from "antd";
import { useWindowWidth } from "../../../../hooks/useResize";
import { ActorsCardProps } from "./ActorsCard.type";
import styles from "./ActorsCard.module.scss";

const ActorsCard = ({ film }: ActorsCardProps) => {
  const windowWidth = useWindowWidth();
  const hasPagination = film.persons.length > 10;

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Фото",
      dataIndex: "photo",
      key: "photo",
      render: (text: string) => (
        <Image width={windowWidth > 420 ? 80 : 40} src={text} />
      ),
    },
    {
      title: "Профессия",
      dataIndex: "profession",
      key: "profession",
      render: (text: string) => <p>{text}</p>,
    },
  ];
  return (
    <div className={styles.persons}>
      <Table
        dataSource={film.persons}
        columns={columns}
        pagination={
          hasPagination ? { pageSize: 10, position: ["bottomCenter"] } : false
        }
      />
    </div>
  );
};

export default ActorsCard;
