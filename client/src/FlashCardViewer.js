import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "./img/arrow-left.png";
import arrowRight from "./img/arrow-right.png";
// import { Text } from "react"

const FlashcardViewer = (props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isViewingWord, setIsViewingWord] = useState(true);

  const changeTextViewed = () => {
    isViewingWord ? setIsViewingWord(false) : setIsViewingWord(true);
  };

  const moveBackward = () => {
    if (currentWordIndex - 1 >= 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const moveForward = () => {
    if (currentWordIndex + 1 < props.words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };
  return (
    <div>
      <div className="p-3" style={{textAlign: "center"}}>
      {currentWordIndex + 1 + "/" + props.words.length}
      </div>
      <span
        className="progress-bar"
        style={{
          width: `${Math.round(
            ((currentWordIndex + 1) / props.words.length) * 100
          )}%`,
        }}
      ></span>
      <div className="flashcard-viewer p-5 m-2">
        <span className="progress-bar"></span>
        <div className="justify-content-begin">
          {isViewingWord ? "Pojęcie" : "Definicja"}
        </div>
        <div
          className="upper-fiszka p-5"
          style={{ fontSize: 35, textAlign: "center" }}
          onClick={changeTextViewed}
        >
          {isViewingWord
            ? props.words[currentWordIndex].word
            : <div>
              {props.words[currentWordIndex].translation}
              <img src={props.words[currentWordIndex].imageUrl} height="100" />
              </div>
            }
        </div>
        <Row>
          <Col>
            <div className="next-button m-1 p-3" onClick={moveBackward}>
              <img src={arrowLeft} height="18"></img>
            </div>
          </Col>
          <Col>
            <div className="next-button m-1 p-3" onClick={moveForward}>
              <img src={arrowRight} height="18"></img>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default FlashcardViewer;
