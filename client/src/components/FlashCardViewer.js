import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";
import { useNavigate } from "react-router-dom";

const FlashcardViewer = ({title, words, setId}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isViewingWord, setIsViewingWord] = useState(true);
  const navigate = useNavigate()

  const changeTextViewed = () => {
    isViewingWord ? setIsViewingWord(false) : setIsViewingWord(true);
  };

  const moveBackward = () => {
    if (currentWordIndex - 1 >= 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const moveForward = () => {
    if (currentWordIndex + 1 < words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };
  return (
    <>
      <div className="p-2" style={{justifyContent: "space-between", display: "flex", alignItems: "center"}}>
      <img src={arrowLeft} onClick={() => navigate(`/view-set/${setId}`)} height="25"></img>
        {currentWordIndex + 1 + "/" + words.length}
        <h4>{title}</h4>
      </div>
      <span
        className="progress-bar"
        style={{
          width: `${Math.round(
            ((currentWordIndex + 1) / words.length) * 100
          )}%`,
        }}
      ></span>

      <div className="flashcard-viewer p-5 m-2">
        <span className="progress-bar"></span>
        <div className="justify-content-begin">
          {isViewingWord ? <span className="font-background">Pojęcie</span>:  <span className="font-background">Definicja</span>}
        </div>
        <div
          className="upper-fiszka p-5"
          style={{ fontSize: 45, display: "flex", alignItems: "center", justifyContent: "center"}}
          onClick={changeTextViewed}
        >
            {isViewingWord
              ? words[currentWordIndex].word
              : <div>
                {words[currentWordIndex].translation}
                <br />
                {words[currentWordIndex].imageUrl && <img src={words[currentWordIndex].imageUrl} height="200" />}
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
    </>
  );
};
export default FlashcardViewer;
