import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import ElaAnswer from "./ElaAnswer";
import { useState, useEffect, useSyncExternalStore } from "react";
import Button from "react-bootstrap/Button";
import ProgressBar from "./ProgressBar";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

const ElaMode = () => {
  const navigate = useNavigate();

  const { setId } = useParams();
  const [set, setSet] = useState();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [showInput, setShowInput] = useState();
  const [input, setInput] = useState();
  const [answerArray, setAnswerArray] = useState();
  const [errorText, setErrorText] = useState();
  const [errorCount, setErrorCount] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    const fetchSets = async () => {
      console.log("FETCHING SET");
      const fetchedSet = await axios.get(
        `http://localhost:5000/api/set/${setId}`
      );
      setSet(fetchedSet.data);
      setAnswerArray(getAnswerArray(fetchedSet.data.flashcards, 0));
    };
    fetchSets();
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
    while (answerArray.length != 3) {
      let answer = randomElementFromArray(flashcards).word;
      if (
        !answerArray.includes(answer) &&
        answer != flashcards[currentFlashcardIndex].word
      ) {
        answerArray.push(answer);
      }
    }
    let answerIndex = Math.floor(Math.random() * 4);
    answerArray.splice(answerIndex, 0, flashcards[currentFlashcardIndex].word);
    return answerArray;
  };

  return (
    <>
      <MainNavbar />
      {errorText && (
        <Popup
          show={errorText ? true : false}
          text={errorText}
          onHide={() => setErrorText(null)}
        />
      )}
      {set && (
        <Container>
          {!hasFinished && (
            <ProgressBar
              complete={currentFlashcardIndex}
              all={set.flashcards.length}
            />
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
                    className="ela-input"
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
                  {answerArray.map((elem, index) => {
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
              <Button onClick={() => navigate(`/view-set/${setId}`)}>
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
