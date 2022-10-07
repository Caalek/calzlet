import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";

const WordViewer = (props) => {
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
    if (currentWordIndex + 1 < props.flashcards.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  return (
    <div className="word-viewer p-5 m-5">
      <div style={{ textAlign: "center" }}>
        {currentWordIndex + 1 + "/" + props.flashcards.length}
      </div>
      <div
        className="p-5"
        style={{ fontSize: 35, textAlign: "center" }}
        onClick={changeTextViewed}
      >
        {isViewingWord ? (
          props.flashcards[currentWordIndex].word
        ) : (
          <div>
            {props.flashcards[currentWordIndex].translation}
            <br />
            {props.flashcards[currentWordIndex].imageUrl && (
              <img src={props.flashcards[currentWordIndex].imageUrl} height="100" />
            )}
          </div>
        )}
      </div>
      <Row>
        <Col>
          <div className="next-button m-1" onClick={moveBackward}>
            <img src={arrowLeft} height="18"></img>
          </div>
        </Col>
        <Col>
          <div className="next-button m-1" onClick={moveForward}>
            <img src={arrowRight} height="18"></img>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default WordViewer;
