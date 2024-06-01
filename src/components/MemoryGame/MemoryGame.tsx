import { useEffect, useState, useCallback } from "react";
import Card from "../Card";
import "./MemoryGame.css";
import { ImageCard } from "../../types/ImageCard";

function shuffleArray(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5);
}

function createGameImages(images: string[]): ImageCard[] {
  const doubledImages = [...images, ...images];
  const shuffledImages = shuffleArray(doubledImages);
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

  useEffect(() => {
    if (selectedInRound.length === 2) {
      const [first, second] = selectedInRound;
      if (
        gameImages[first].src !== gameImages[second].src ||
        first === second
      ) {
        setTimeout(() => {
          setGameImages((prevImages) =>
            prevImages.map((img) =>
              img.index === first || img.index === second
                ? { ...img, isSelected: false }
                : img
            )
          );
        }, 400);
      }
      setSelectedInRound([]);

      const isGameFinished = gameImages.every((img) => img.isSelected);
      if (isGameFinished) setGameImages(createGameImages(images));
    }
  }, [selectedInRound, gameImages, images]);

  const handleSelect = useCallback((image: ImageCard) => {
    setSelectedInRound((prevSelected) => [...prevSelected, image.index]);
    setGameImages((prevImages) =>
      prevImages.map((img) =>
        img.index === image.index ? { ...img, isSelected: true } : img
      )
    );
  }, []);

  return (
    <div className="GameContainer">
      <div className="Game">
        {gameImages.map((img) => (
          <Card img={img} handleSelect={handleSelect} key={img.index} />
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
