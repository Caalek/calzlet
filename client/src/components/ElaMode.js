import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ElaAnswer from "./ElaAnswer";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ProgressBar from "./ProgressBar";
import "../css/ElaMode.css"

const ElaMode = () => {
  const navigate = useNavigate();

  const { setId } = useParams();
  const [set, setSet] = useState();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false); //eslint-disable-line
  const [showInput, setShowInput] = useState();
  const [input, setInput] = useState();
  const [answerArray, setAnswerArray] = useState();
  const [errorText, setErrorText] = useState();
  const [errorCount, setErrorCount] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const [share, setShare] = useState()

  const { user } = useAuth()

  useEffect(() => {
    const fetchSet = async () => {
      const fetchedSet = await axios.get(
        `/api/set/${setId}`
      );
      setSet(fetchedSet.data);
      setAnswerArray(getAnswerArray(fetchedSet.data.flashcards, 0))
    };

    const fetchShare = async () => {
      const params = {
        userId: user.userId,
        setId: setId
      }
      const response = await axios.get("/api/shares", {params: params, headers: { Authorization: `Bearer ${user.token}` }});
      setShare(response.data)
      setCurrentFlashcardIndex(response.data.lastElaIndex)
    }

    fetchSet();
    if (user) {
      fetchShare()
    } else {
      setCurrentFlashcardIndex(0)
    }
  }, []);

  const checkAnswer = (answer) => {
    if (answer === set.flashcards[currentFlashcardIndex].word) {
      setCorrectAnswer(true);
      setShowInput(true);
    } else {
      setErrorText("Spróbuj jeszcze raz.");
    }
  };

  const checkInput = () => {
    if (currentFlashcardIndex === set.flashcards.length - 1) {
      setHasFinished(true);
    } else {
      if (input === set.flashcards[currentFlashcardIndex].word) {
        setCurrentFlashcardIndex(currentFlashcardIndex + 1);
        // TYMCZASOWA NAPRAWA ZE WZGLEDU NA TO ZE REACT NIE UPDATUJE TU STATA I ODPOWIEDZ JEST O 1 INDEX ZA MALA ZAWSZE
        setAnswerArray(
          getAnswerArray(set.flashcards, currentFlashcardIndex + 1)
        );
        setErrorCount(0)
        setShowInput(false);
      } else {
        if (errorCount === 3) {
          setShowInput(false);
        }
        setErrorCount(errorCount + 1);
        setErrorText("Spróbuj jeszcze raz.");
      }
    }
  };

  const randomElementFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getAnswerArray = (flashcards, currentFlashcardIndex) => {
    let answerArray = [];
    while (answerArray.length !== 3) {
      let answer = randomElementFromArray(flashcards).word;
      if (
        !answerArray.includes(answer) &&
        answer !== flashcards[currentFlashcardIndex].word
      ) {
        answerArray.push(answer);
      }
    }
    let answerIndex = Math.floor(Math.random() * 4);
    answerArray.splice(answerIndex, 0, flashcards[currentFlashcardIndex].word);
    return answerArray;
  };

  const leaveSet = async () => {
    const params = {
      userId: user.userId,
      setId: setId
    }
    const patchObject = {
      accessed: new Date(),
      lastElaIndex: currentFlashcardIndex
    }
    await axios.patch("/api/share", patchObject, { params: params, headers: { Authorization: `Bearer ${user.token}` }});
    navigate(`/view-set/${setId}`)
  }

  return (
    <>
      {errorText && (
        <Popup
          show={errorText ? true : false}
          text={errorText}
          onHide={() => setErrorText(null)}
        />
      )}
      {set && (
        <Container className="mt-2">
          {!hasFinished && (
            <>
            <ProgressBar title={set.title} setId={setId} complete={currentFlashcardIndex} all={set.flashcards.length} />
          </>
          )}
          {!hasFinished && (
            <div className="ela-mode p-3 mt-4">
              <div style={{ fontSize: 30 }}>
                {set.flashcards[currentFlashcardIndex].translation}
              </div>
              {showInput ? (
                <div>
                  <div className="mt-5">Teraz wpisz tłumaczenie: </div>
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Tłumaczenie"
                    onChange={(e) => setInput(e.target.value)}
                  ></input>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button onClick={checkInput} className="mt-3">
                      Sprawdź
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mt-5">Wybierz poprawne pojęcie</div>
                  {answerArray && answerArray.map((elem, index) => {
                    return (
                      <ElaAnswer
                        key={index}
                        index={index}
                        text={elem}
                        checkAnswer={checkAnswer}
                      ></ElaAnswer>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {hasFinished && (
            <div style={{ textAlign: "center" }} className="mt-5">
              <h1>Gratulacje!</h1>
              <p>{`Ukończyłeś Ela mode dla zestawu ${set.title}!`}</p>
              <Button onClick={leaveSet}>
                Powrót do strony zestawu
              </Button>
            </div>
          )}
        </Container>
      )}
    </>
  );
};
export default ElaMode;
