import { ImgProps } from "./Img.type";

const Img = ({ width, height, src, alt, className }: ImgProps) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px`, background: "grey" }}
      className={className}
    >
      <img src={src} alt={alt} className={className} />
    </div>
  );
};
export default Img;
