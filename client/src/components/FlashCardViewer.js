import { useContext, useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";
import "./FlashCardViewer.css";

const FlashcardViewer = ({ title, words, setId, lastIndex }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(lastIndex);
  const [isViewingWord, setIsViewingWord] = useState(true);
  const [hasFinished, setHasFinished] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const front = useRef()
  const viewer = useRef();

  const changeTextViewed = () => {
    if (isViewingWord) {
      setIsViewingWord(false);
    } else {
      setIsViewingWord(true);
    }
  };

  useEffect(() => {
    // front.current.classList.toggle("flashcard-hidden")
    viewer.current.classList.toggle("flashcard-clicked")
  }, [isViewingWord])

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
      <div
        className="flashcard-viewer p-5 font-regular"
        onClick={changeTextViewed}
        ref={viewer}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front" ref={front}>
            {words[currentWordIndex].word}
          </div>
          <div className="flashcard-back">
            {/* {words[currentWordIndex].translation} */}000
          </div>
        </div>
      </div>
    </>
  );
};
export default FlashcardViewer;
