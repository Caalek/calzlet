import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "../css/FlippingCard.css";
import IconButton from "./IconButton";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";

const FlippingCard = ({
  word,
  translation,
  imageUrls,
  moveForward,
  moveBackward,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={
        flipped
          ? "flashcard-viewer p-3 font-regular flashcard-clicked"
          : "flashcard-viewer p-3 font-regular"
      }
    >
      <div className="flashcard-inner" onClick={() => setFlipped(!flipped)}>
        <div className="flashcard-front">
          <div className="font-background p-5">Słówko </div>
          <div className="flashcard-text-container">
            <div className="flashcard-text flashcard-text-front">{word}</div>
          </div>
        </div>
        <div className="flashcard-back">
          <div className="font-background p-5">Definicja</div>
          <div className="flashcard-text-container">
            <div className="flashcard-text">{translation}</div>
          </div>
          <div className="flashcard-image-container">
            {imageUrls.map((imageUrl) => {
              return (
                <div>
                  <img
                    className="flashcard-image"
                    key={imageUrl}
                    src={imageUrl}
                    alt="obrazek do fiszki"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlippingCard;
