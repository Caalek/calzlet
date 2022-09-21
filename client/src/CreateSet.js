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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateSet = (props) => {
  const { user, setUser } = useContext(UserContext)
  const { setId } = useParams()

  const [flashcards, setFlashcards] = useState(props.flashcards)
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [password, setPassword] = useState(null);

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
        flashcards[i][field] = change;
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
    console.log(response)
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

  function handleSubmit() {
    setId ? replaceSet() : createSet()
    navigate("/your-sets")
  }


  return (
    <div>
      <div className="mt-5">
        <Container>
          <h1>{setId ? "Edytuj zestaw" : "Stwórz zestaw"}</h1>
          <Form>
            <Form.Group>
              <Form.Label>Tytuł</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={props.title}
              ></Form.Control>
              <Form.Label>Opis</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={props.description}
              ></Form.Control>
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
              onClick={handleSubmit}
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
