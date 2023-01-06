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

  const moveForward = async () => {
    if (currentWordIndex + 1 < words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setHasFinished(true);
      const params = {
        userId: user.userId,
        setId: setId,
      };
      await axios.patch(
        `/api/share`,
        { lastIndex: 0 },
        { params: params, headers: { Authorization: `Bearer ${user.token}` } }
      );
    }
  };

  const leaveSet = async () => {
    if (!hasFinished) {
      const params = {
        userId: user.userId,
        setId: setId,
      };
      const patchObject = {
        accessed: new Date(),
        lastIndex: currentWordIndex,
      };
      await axios.patch("/api/share", patchObject, { params: params });
    }
    navigate(`/view-set/${setId}`);
  };

  return (
    <>
      {hasFinished ? (
        <div style={{ textAlign: "center" }} className="mt-5">
          <h1>Gratulacje!</h1>
          <p>{`Ukończyłeś fiszki dla zestawu ${title}!`}</p>
          <Button onClick={leaveSet}>Powrót do strony zestawu</Button>
        </div>
      ) : (
        <>
          <ProgressBar
            title={title}
            setId={setId}
            complete={currentWordIndex}
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
      )}
    </>
  );
};
export default FlashcardViewer;
