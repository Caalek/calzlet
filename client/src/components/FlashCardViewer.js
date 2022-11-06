import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button"

const FlashcardViewer = ({ title, words, setId }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isViewingWord, setIsViewingWord] = useState(true);
  const [hasFinished, setHasFinished] = useState(false)
  const navigate = useNavigate();

  const changeTextViewed = () => {
    isViewingWord ? setIsViewingWord(false) : setIsViewingWord(true);
  };

  const moveBackward = () => {
    if (currentWordIndex - 1 >= 0) {
      setHasFinished(false)
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const moveForward = () => {
    if (currentWordIndex + 1 < words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setHasFinished(true)
    }
  };
  return (
    <>
      <div
        className="p-2"
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={arrowLeft}
          onClick={() => navigate(`/view-set/${setId}`)}
          height="25"
        ></img>
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
          {!hasFinished && 
          <>
          {isViewingWord ? (
            <span className="font-background">Pojęcie</span>
          ) : (
          <span className="font-background">Definicja</span>
          )}
          </>
          }
        </div>
        <div
          className="upper-fiszka p-5"
          style={{
            fontSize: 45,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={changeTextViewed}
        >

          {hasFinished &&
          <div style={{display: "inline", textAlign: "center"}}>
            <span>Gratulacje!</span>
            <br></br>
            <span>Ukończyłeś zestaw {title}! </span>
            <br></br>
            <Link to={`/view-set/${setId}`}><Button>Powrót do strony zestawu</Button></Link>
          </div>
          }

          {!hasFinished && 
          <>
          {isViewingWord  ? (
            words[currentWordIndex].word
          ) : (
            <div>
              {words[currentWordIndex].translation}
              <br />
              {words[currentWordIndex].imageUrls.map(imageUrl => {
                return <img key={imageUrl} src={imageUrl} height="200" />
              })}
            </div>
          )}
          </>
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
