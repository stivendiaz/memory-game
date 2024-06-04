import { ImageCard } from "../../types/ImageCard";
import "./Card.css";

function Card({
  image,
  onSelect,
}: {
  image: ImageCard;
  onSelect: (img: ImageCard) => void;
}) {
  return (
    <div>
      <img
        className={image.isSelected ? "img" : " emptyCard img"}
        onClick={() => (image.isSelected ? null : onSelect(image))}
        src={image.src}
        alt={image.src}
      />
    </div>
  );
}

export default Card;
