import { ImgProps } from "./Img.type";
import styles from "./Img.module.scss";

const Img = ({ width, height, src, alt, className }: ImgProps) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px`, background: "grey" }}
      className={`${styles.image} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className={className} />
      ) : (
        <div className={styles.image__notification}>
          <p>Картинка не найдена или отсутствует у данного контента.</p>
        </div>
      )}
    </div>
  );
};
export default Img;
