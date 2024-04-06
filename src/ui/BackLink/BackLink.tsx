import { useNavigate } from "react-router-dom";
import styles from "./BackLink.module.scss";
import { BackLinkProps } from "./BackLink.type";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackLink = ({ text = "Назад" }: BackLinkProps) => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <button className={styles.button} onClick={handleBack}>
      <ArrowLeftOutlined />
      <span>{text}</span>
    </button>
  );
};

export default BackLink;
