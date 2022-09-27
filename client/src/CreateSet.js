import Form from "react-bootstrap/Form";
import CreatePhrase from "./CreatePhrase";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainNavbar from "./MainNavbar";
import UserContext from "./UserContext";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup"

const CreateSet = (props) => {
  const { user, setUser } = useContext(UserContext)
  const { setId } = useParams()

  const [flashcards, setFlashcards] = useState(props.flashcards)
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [password, setPassword] = useState(null);

  const [errorText, setErrorText] = useState()

  console.log("rerendered")

  const navigate = useNavigate()

  const createFlashcard = () => {
    let newArray = flashcards.concat([
      { word: "", translation: "", imageUrl: "", index: flashcards.length },
    ]);
    setFlashcards(newArray);
  };

  const editFlashcard = (index, field, change) => {
    for (let i = 0; i < flashcards.length; i++) {
      if (flashcards[i].index === index) {
        let newFlashcards = flashcards
        newFlashcards[i][field] = change;
        setFlashcards(newFlashcards)
      }
    }
  };

  async function createSet() {
    const data = {
      userId: user.sub, //id usera od googla
      title: title,
      description: description,
      flashcards: flashcards,
      password: password,
    }
    const response = await axios.post("http://localhost:5000/api/set", data)
  }

  async function replaceSet() {
    const data = {
      userId: user.sub, //id usera od googla
      title: title,
      description: description,
      flashcards: flashcards,
      password: password,
      _id: setId
    }
    const response = await axios.put(`http://localhost:5000/api/set/${setId}`, data)
    console.log(response)

  }

  function deleteFlashcard(indexToDelete) {
    let array = flashcards.filter((flashcard) => {return flashcard.index !== indexToDelete})
    for (let i = indexToDelete; i < array.length; i ++) {
      array[i].index = array[i].index - 1
    }
    setFlashcards(array)
  }

  // function setFlashcardIndex(initialIndex, indexToSet) {
  //   let array = flashcards
  //   const element = flashcards[indexToSet]
  //   flashcards[indexToSet] = flashcards[initialIndex]
  //   flashcards[initialIndex] = element
  //   setFlashcards(array)
  //   console.log(flashcards)
  // }

  function handleSubmit() {
    if (!title || flashcards.length === 0) {
      setErrorText("Twój zestaw musi mieć przynajmniej tytuł i jedną fiszkę.")
      return
    }
    setId ? replaceSet() : createSet()
    navigate("/your-sets")
  }



  return (
    <>
      <Popup show={errorText ? true : false} text={errorText} onHide={() => setErrorText(null)} />
      <div className="mt-5">
        <Container>
          <h1>{setId ? "Edytuj zestaw" : "Stwórz zestaw"}</h1>
          <Form>
            <Form.Group>
              <Form.Label>Tytuł</Form.Label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={props.title}
              ></input>
              <Form.Label>Opis</Form.Label>
              <textarea
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={props.description}
              ></textarea>
            </Form.Group>
            Fiszki
          </Form>
          {flashcards && flashcards.map((flashcard, index) => {
            return (
              <CreatePhrase
                key={index}
                index={index}
                word={flashcard.word}
                translation={flashcard.translation}
                imageUrl={flashcard.imageUrl}
                editFlashcard={editFlashcard}
                deleteFlashcard={deleteFlashcard}
                // setFlashcardIndex={setFlashcardIndex}
              />
            );
          })}
          <div className="p-3" style={{ textAlign: "center" }}>
            <Button onClick={createFlashcard} className="mt-3">
              Dodaj fiszkę
            </Button>
          </div>
          {/* <div className="m-2">
            <h3>Hasło</h3>
            <p>Możesz zabezpieczyć swój zestaw hasłem.</p>
            <Form.Control
              className="fraza-normal"
              type="password"
              placeholder="Hasło"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </div> */}

          <div className="mt-4" style={{justifyContent: "center", display: "flex"}}>
            <Button
              onClick={handleSubmit}
              size="lg"
            >
              Zapisz i kontynuuj
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};
export default CreateSet;
