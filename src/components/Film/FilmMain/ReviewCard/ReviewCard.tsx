import { useState } from "react";
import styles from "./ReviewCard.module.scss";
import { ReviewCardProps } from "./ReviewCard.type";
import { Collapse } from "antd";
import { useAppSelector } from "../../../../hooks/redux";

const ReviewCard = ({ comment }: ReviewCardProps) => {
  const { Panel } = Collapse;
  const { value: theme } = useAppSelector((state) => state.theme);
  const [isOpen, setIsOpen] = useState(false);
  const handleCollapseChange = (key: string | any[]) => {
    setIsOpen(!!key.length);
  };

  const summaryText =
    comment.review.length > 100
      ? `${comment.review.slice(0, 100)}...`
      : comment.review;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.tag}>Тип: {comment.type}</div>
      </div>
      <div className={styles.title}>
        <h2>{comment.title}</h2>
      </div>
      <div className={styles.text}>
        <Collapse bordered={false} ghost onChange={handleCollapseChange}>
          <Panel
            header={isOpen ? comment.review : summaryText}
            key="1"
            className={theme === "dark" ? `${styles.dark}` : ""}
          />
        </Collapse>
      </div>
      <div className={styles.cardFooter}>
        <h5>{comment.author}</h5>
        <h5 className={styles.like}>
          Нравится: {comment.reviewLikes ? comment.reviewLikes : 0}
        </h5>
        <h5 className={styles.dislike}>
          Не нравится: {comment.reviewDislikes ? comment.reviewDislikes : 0}
        </h5>
      </div>
    </div>
  );
};

export default ReviewCard;
