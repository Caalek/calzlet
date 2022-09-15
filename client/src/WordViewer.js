import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "./img/arrow-left.png";
import arrowRight from "./img/arrow-right.png";

const WordViewer = (props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isViewingWord, setIsViewingWord] = useState(true);
  console.log(currentWordIndex);

  const changeTextViewed = () => {
    isViewingWord ? setIsViewingWord(false) : setIsViewingWord(true);
  };

  const moveBackward = () => {
    if (currentWordIndex - 1 >= 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
    console.log(currentWordIndex);
  };

  const moveForward = () => {
    if (currentWordIndex + 1 < props.words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
    console.log(currentWordIndex);
  };

  return (
    <div className="word-viewer p-5 m-5">
      <div style={{ textAlign: "center" }}>
        {currentWordIndex + 1 + "/" + props.words.length}
      </div>
      <div
        className="p-5"
        style={{ fontSize: 35, textAlign: "center" }}
        onClick={changeTextViewed}
      >
        {isViewingWord
          ? props.words[currentWordIndex].word
          : props.words[currentWordIndex].translation}
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
