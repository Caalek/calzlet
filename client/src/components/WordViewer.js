import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";

const WordViewer = ({ flashcards, lastIndex }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(lastIndex);
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
    if (currentWordIndex + 1 < flashcards.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  return (
    <div className="word-viewer p-5 m-3">

      
      <div style={{ textAlign: "center" }}>
        {currentWordIndex + 1 + "/" + flashcards.length}
      </div>
      <div
        className="p-5"
        style={{ fontSize: 35, textAlign: "center" }}
        onClick={changeTextViewed}
      >
        {isViewingWord ? (
          flashcards[currentWordIndex].word
        ) : (
          <div>
            {flashcards[currentWordIndex].translation}
            <br />
            {flashcards[currentWordIndex].imageUrl && (
              <img src={flashcards[currentWordIndex].imageUrl} height="100" alt="obrazek z fiszki"/>
            )}
          </div>
        )}
      </div>
      <Row>
        <Col>
          <div className="next-button m-1" onClick={moveBackward}>
            <img src={arrowLeft} height="18" alt="strzałka w lewo"></img>
          </div>
        </Col>
        <Col>
          <div className="next-button m-1" onClick={moveForward}>
            <img src={arrowRight} height="18" alt="strzałka w prawo"></img>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default WordViewer;
