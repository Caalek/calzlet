import { useContext, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import UserContext from "../context/UserContext";

const FlashcardViewer = ({ title, words, setId, lastIndex }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(lastIndex);
  const [isViewingWord, setIsViewingWord] = useState(true);
  const [hasFinished, setHasFinished] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const viewer = useRef()

  const changeTextViewed = () => {
    viewer.current.classList.toggle("flip-animation")
    if (isViewingWord) {
      viewer.current.classList.toggle("flip-animation2")
      viewer.current.classList.toggle("flip-animation")
      setIsViewingWord(false)
    } else {
      viewer.current.classList.toggle("flip-animation")
      viewer.current.classList.toggle("flip-animation2")
      setIsViewingWord(true)
    }
  };

  const moveBackward = () => {
    if (currentWordIndex - 1 >= 0) {
      setHasFinished(false);
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const moveForward = () => {
    if (currentWordIndex + 1 < words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setHasFinished(true);
    }
  };

  const leaveSet = async () => {
    if (user) {
      const data = { lastIndex: currentWordIndex, accessed: new Date() };
      await axios.patch(`/api/set/${setId}`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }
    navigate(`/view-set/${setId}`);
  };

  return (
    <>
      <Row className="p-2">
        <Col xs={1}>
          <img
            className="mt-2"
            src={arrowLeft}
            onClick={leaveSet}
            height="25"
            alt="opuść zestaw"
          ></img>
        </Col>
        <Col xs={10}>
          <div style={{ textAlign: "center" }}>
            <div>{currentWordIndex + 1 + " / " + words.length}</div>
            {title}
          </div>
        </Col>
      </Row>

      <span
        className="progress-bar"
        style={{
          width: `${Math.round(
            ((currentWordIndex + 1) / words.length) * 100
          )}%`,
        }}
      ></span>

        <div className="flashcard-viewer flip-animation p-5 m-2" ref={viewer}>
          <span className="progress-bar"></span>
          <div className="justify-content-begin">
            {!hasFinished && (
              <>
                {isViewingWord ? (
                  <span className="font-background">Pojęcie</span>
                ) : (
                  <span className="font-background">Definicja</span>
                )}
              </>
            )}
          </div>
          <div
            className="upper-fiszka p-5"
            style={{
              fontSize: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={changeTextViewed}
          >
            {hasFinished && (
              <div style={{ display: "inline", textAlign: "center" }}>
                <span>Gratulacje!</span>
                <br></br>
                <span>Ukończyłeś zestaw {title}! </span>
                <br></br>
                <Link to={`/view-set/${setId}`}>
                  <Button>Powrót do strony zestawu</Button>
                </Link>
              </div>
            )}

            {!hasFinished && (
              <>
                {isViewingWord ? (
                  words[currentWordIndex].word
                ) : (
                  <div>
                    {words[currentWordIndex].translation}
                    <br />
                    {words[currentWordIndex].imageUrls.map((imageUrl) => {
                      return <img key={imageUrl} src={imageUrl} height="200" alt="obrazek do fiszki"/>;
                    })}
                  </div>
                )}
              </>
            )}
          </div>
          <Row>
            <Col>
              <div className="next-button m-1 p-3" onClick={moveBackward}>
                <img src={arrowLeft} height="18" alt="strzałka w lewo"></img>
              </div>
            </Col>
            <Col>
              <div className="next-button m-1 p-3" onClick={moveForward}>
                <img src={arrowRight} height="18" alt="strzałka w prawo"></img>
              </div>
            </Col>
          </Row>
        </div>
    </>
  );
};
export default FlashcardViewer;