import MainNavbar from "./MainNavbar";
import Form from "react-bootstrap/Form";
import CreatePhrase from "./CreatePhrase";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CreateSet() {
  const [word, setWord] = useState();
  const [translation, setTranslation] = useState();

  const [flashcards, setFlashcards] = useState([]);
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [editPassword, setEditPassword] = useState();

  function createFlashcard(e) {
    e.preventDefault();
    let newArray = flashcards.concat([
      { word: word, translation: translation, id: uuidv4() },
    ]);
    console.log(newArray);
    setFlashcards(newArray);
    setWord("");
    setTranslation("");
    e.target.reset();
  }

  function editFlashcard(id, field, change) {
    for (let i = 0; i < flashcards.length; i++) {
      if (flashcards[i].id === id) {
        if (field === "word") {
          flashcards[i].word = change;
          console.log(change);
        } else {
          flashcards[i].translation = change;
        }
      }
    }
  }

  async function createSet() {
    let response = await fetch("http://localhost:5000/studysets", {
      method: "CREATE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studyset_name: name,
        studyset_desc: desc,
        edit_password: editPassword,
      }),
    });
    console.log(response.json());
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
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
            <Form.Label>Opis</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => setDesc(e.target.value)}
            ></Form.Control>
          </Form.Group>
          Fiszki
        </Form>
        {flashcards.map((flashcard) => {
          return (
            <CreatePhrase
              key={flashcard.id}
              id={flashcard.id}
              word={flashcard.word}
              translation={flashcard.translation}
              editFlashcard={editFlashcard}
            />
          );
        })}
        <div className="p-3" style={{ textAlign: "center" }}>
          <Form onSubmit={(e) => createFlashcard(e)}>
            <Row>
              <Col sm={12} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Pojęcie"
                  onChange={(e) => setWord(e.target.value)}
                ></Form.Control>
              </Col>
              <Col sm={12} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Definicja"
                  onChange={(e) => setTranslation(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
            <Button className="mt-3" type="submit" variant="outline-success">
              Dodaj fiszkę
            </Button>
          </Form>
        </div>
        <div className="m-2">
          <h3>Hasło do edycji</h3>
          <p>
            Znający to hasło będą mogli edytować ten zestaw. Zapamiętaj je, bo
            nie można go potem odzyskać.
          </p>
          <Form.Control
            className="fraza-normal"
            type="password"
            placeholder="Hasło do edycji"
            onChange={(e) => setEditPassword(e.target.value)}
          ></Form.Control>
        </div>

        <div className="mt-4">
          <Button
            onClick={() => {
              createSet();
            }}
            variant="outline-success"
          >
            Zapisz i kontynuuj
          </Button>
        </div>
      </Container>
    </div>
  </div>
  );
}
