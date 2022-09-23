import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import ElaAnswer from "./ElaAnswer";

const { useState, useEffect } = require("react");

const ElaMode = () => {
  const { setId } = useParams();
  const [set, setSet] = useState();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [answerArray, setAnswerArray] = useState()
  const [correctAnswer, setCorrectAnswer] = useState(false)

  const letters = ["a", "b", "c", "d"];

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(
        `http://localhost:5000/api/set/${setId}`
      );
      setSet(fetchedSet.data);
    };
    fetchSets();
  }, []);

  const checkAnswer = (answer) => {
    if (answer === set.flashcards[currentFlashcardIndex].word) {
      setCorrectAnswer(true)
      setCurrentFlashcardIndex(currentFlashcardIndex + 1)
      // setAnswerArray(getAnswerArray())
    }
  };

  const randomElementFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getAnswerArray = () => {
    let answerArray = [];
    while (answerArray.length != 3) {
      let answer = randomElementFromArray(set.flashcards).word;
      if (
        !answerArray.includes(answer) &&
        answer != set.flashcards[currentFlashcardIndex].word
      )
        answerArray.push(answer);
    }
    let answerIndex = Math.floor(Math.random() * 4);
    answerArray.splice(
      answerIndex,
      0,
      set.flashcards[currentFlashcardIndex].word
    );
    return answerArray;
  };

  return (
    <>
      <MainNavbar></MainNavbar>
      {set && (
        <Container>
          <div className="ela-mode p-3 mt-4">
            <div style={{ fontSize: 30 }}>
              {set.flashcards[currentFlashcardIndex].translation}
            </div>
            <div className="mt-5">Wybierz poprawne pojęcie</div>
            {getAnswerArray().map((elem, index) => {
              return (
                <ElaAnswer key={index} index={index} text={elem} checkAnswer={checkAnswer}></ElaAnswer>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
};
export default ElaMode;
