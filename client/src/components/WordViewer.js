import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../css/WordViewer.css";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";
import FlippingCard from "./FlippingCard";
import IconButton from "./IconButton";
import ProgressBar from "./ProgressBar";

const WordViewer = ({ flashcards, lastIndex }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(lastIndex);

  const moveBackward = () => {
    if (currentWordIndex - 1 >= 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const moveForward = () => {
    if (currentWordIndex + 1 < flashcards.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  return (
    <div className="viewer p-3 m-2 mb-4">
      <div className="viewer-amount">
        {currentWordIndex + 1} / {flashcards.length}
      </div>
      <FlippingCard
        word={flashcards[currentWordIndex].word}
        translation={flashcards[currentWordIndex].translation}
        imageUrls={flashcards[currentWordIndex].imageUrls}
      />
      <Row>
        <Col>
          <IconButton iconSrc={arrowLeft} onClick={moveBackward} />
        </Col>
        <Col>
          <IconButton iconSrc={arrowRight} onClick={moveForward} />
        </Col>
      </Row>
    </div>
  );
};
export default WordViewer;
