import { ImageCard } from "../../types/ImageCard";
import "./Card.css";

function Card({
  img,
  handleSelect,
}: {
  img: ImageCard;
  handleSelect: (img: ImageCard) => void;
}) {
  return (
    <div>
      <img
        className={img.isSelected ? "img" : " emptyCard img"}
        onClick={() => handleSelect(img)}
        src={img.src}
        alt={img.src}
      />
    </div>
  );
}

export default Card;
