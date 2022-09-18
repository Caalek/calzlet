import Form from "react-bootstrap/Form";
import CreatePhrase from "./CreatePhrase";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainNavbar from "./MainNavbar";
import UserContext from "./UserContext";
import axios from 'axios'

const CreateSet = () => {
  const [flashcards, setFlashcards] = useState([
    { word: "", translation: "", index: 0 },
  ]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState(null);
  const { user, setUser } = useContext(UserContext)

  const createFlashcard = () => {
    let newArray = flashcards.concat([
      { word: "", translation: "", index: flashcards.length },
    ]);
    setFlashcards(newArray);
  };

  const editFlashcard = (index, field, change) => {
    for (let i = 0; i < flashcards.length; i++) {
      if (flashcards[i].index === index) {
        if (field === "word") {
          flashcards[i].word = change;
        } else {
          flashcards[i].translation = change;
        }
      }
    }
  };

  async function createSet() {
    const newFlashcardArray = []
    for (let i of flashcards) {
      let newFlashcard = i
      delete newFlashcard["index"]
      newFlashcardArray.push(newFlashcard)
    }

    const data = {
      userId: user.sub, //id usera od googla
      title: title,
      description: description,
      flashcards: newFlashcardArray,
      password: password,
    }
    const response = await axios.post("http://localhost:5000/api/set", data)
    console.log(response.data)
  }


  return (
    <div>
      <MainNavbar />
      <div className="mt-5">
        <Container>
          <h1>Stwórz zestaw</h1>
          <Form>
            <Form.Group>
              <Form.Label>Tytuł</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
              <Form.Label>Opis</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            Fiszki
          </Form>
          {flashcards.map((flashcard, index) => {
            return (
              <CreatePhrase
                key={index}
                index={index}
                word={flashcard.word}
                translation={flashcard.translation}
                editFlashcard={editFlashcard}
              />
            );
          })}
          <div className="p-3" style={{ textAlign: "center" }}>
            <Button onClick={createFlashcard} className="mt-3">
              Dodaj fiszkę
            </Button>
          </div>
          <div className="m-2">
            <h3>Hasło</h3>
            <p>Możesz zabezpieczyć swój zestaw hasłem.</p>
            <Form.Control
              className="fraza-normal"
              type="password"
              placeholder="Hasło"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </div>

          <div className="mt-4">
            <Button
              onClick={createSet}
              variant="outline-success"
            >
              Zapisz i kontynuuj
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default CreateSet;
