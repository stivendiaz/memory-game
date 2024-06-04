import { useEffect, useState } from "react";

import Card from "../Card";
import "./MemoryGame.css";
import { ImageCard } from "../../types/ImageCard";

import { shuffle } from "lodash";

function createGameImages(images: string[]): ImageCard[] {
  const doubledImages = [...images, ...images];
  const shuffledImages = shuffle(doubledImages);
  return shuffledImages.map((src, index) => ({
    src,
    index,
    isSelected: false,
  }));
}

function MemoryGame({ images }: { images: string[] }) {
  const [selectedInRound, setSelectedInRound] = useState<number[]>([]);
  const [gameImages, setGameImages] = useState<ImageCard[]>([]);

  useEffect(() => {
    setGameImages(createGameImages(images));
  }, [images]);

  const handleSelect = (selectedImage: ImageCard) => {
    const selectedCurrentRound = [...selectedInRound, selectedImage.index];
    const updatedImages = gameImages.map((imageItem) =>
      imageItem.index === selectedImage.index
        ? { ...imageItem, isSelected: true }
        : imageItem
    );
    setGameImages(updatedImages);

    // if round is over - i.e. user clicked two images
    if (selectedCurrentRound.length === 2) {
      const [first, second] = selectedCurrentRound;
      // if we don't have a match

      if (
        gameImages[first].src !== gameImages[second].src ||
        first === second
      ) {
        // flip images back around
        setGameImages(
          updatedImages.map((imageItem) =>
            imageItem.index === first
              ? { ...imageItem, isSelected: false }
              : imageItem
          )
        );
        setSelectedInRound([second]);
      } else {
        setSelectedInRound([]);
      }

      // if at the end of the round all images are selected
      // reset the game
      const isGameFinished = updatedImages.every(
        (imageItem) => imageItem.isSelected
      );
      if (isGameFinished) setGameImages(createGameImages(images));
    } else {
      setSelectedInRound(selectedCurrentRound);
    }
  };

  return (
    <div className="GameContainer">
      <div className="Game">
        {gameImages.map((imageItem) => (
          <Card
            image={imageItem}
            onSelect={handleSelect}
            key={imageItem.index}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
