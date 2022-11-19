import { useContext, useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeft from "../img/arrow-left.png";
import arrowRight from "../img/arrow-right.png";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";
import ProgressBar from "./ProgressBar";
import IconButton from "./IconButton";
import FlippingCard from "./FlippingCard";

const FlashcardViewer = ({ title, words, setId, lastIndex }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(lastIndex);
  const [hasFinished, setHasFinished] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
      <ProgressBar
        title={title}
        setId={setId}
        complete={currentWordIndex + 1}
        all={words.length}
      />
      <FlippingCard
        word={words[currentWordIndex].word}
        translation={words[currentWordIndex].translation}
        imageUrls={words[currentWordIndex].imageUrls}
      />
      <Row>
        <Col>
          <IconButton iconSrc={arrowLeft} onClick={moveBackward} />
        </Col>
        <Col>
          <IconButton iconSrc={arrowRight} onClick={moveForward} />
        </Col>
      </Row>
    </>
  );
};
export default FlashcardViewer;
