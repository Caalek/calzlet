import Form from "react-bootstrap/Form";
import CreatePhrase from "./CreatePhrase";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import AccessManager from "./AccessManager";

const CreateSet = ({ set }) => {
  const { user } = useContext(UserContext);
  const { setId } = useParams();

  const [flashcards, setFlashcards] = useState(set.flashcards);
  const [title, setTitle] = useState(set.title);
  const [description, setDescription] = useState(set.description);

  const [errorText, setErrorText] = useState();
  const [showAccessManager, setShowAccessManager] = useState(false);

  const [viewAccess, setViewAccess] = useState(set.viewAccess || "all");
  const [editAccess, setEditAccess] = useState(set.editAccess || "me");

  const [viewPassword, setViewPassword] = useState(set.viewPassword || "");
  const [editPassword, setEditPassword] = useState(set.editPassword || "");

  const navigate = useNavigate();

  const createFlashcard = () => {
    let newArray = flashcards.concat([
      { word: "", translation: "", imageUrl: "", index: flashcards.length },
    ]);
    setFlashcards(newArray);
  };

  const editFlashcard = (index, field, change) => {
    for (let i = 0; i < flashcards.length; i++) {
      if (flashcards[i].index === index) {
        let newFlashcards = flashcards;
        newFlashcards[i][field] = change;
        setFlashcards(newFlashcards);
      }
    }
  };

  const validateFlashcards = () => {
    for (let flashcard of flashcards) {
      if (!flashcard.translation || !flashcard.word) {
        return false
      }
    }
    return true
  }

  async function createSet() {
    if (!validateFlashcards()) {
      return setErrorText("Wypełnij wszystkie pola.")
    }
    const data = {
      userId: user.user.userId, //id usera od googla
      title: title,
      description: description,
      creatorUsername: user.user.username,
      creatorAvatarUrl: user.user.avatarUrl,
      flashcards: flashcards,
      viewAccess: viewAccess,
      editAccess: editAccess,
      viewPassword: viewPassword,
      editPassword: editPassword,
      associatedUserIds: [user.user.userId]
    };
    await axios.post("/api/set", data, {headers: {'Authorization': `Bearer ${user.token}`}});
  }

  const addToAssociated = (set) => {
    const data = {
      associatedUserIds: set.associatedUserIds.concat([user.user.userId]),
    };
    axios
      .patch(`/api/set/${setId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        {}
      });
  };

  async function replaceSet() {
    const data = {
      userId: user.user.userId, //id usera od googla
      title: title,
      description: description,
      creatorUsername: user.user.username,
      creatorAvatarUrl: user.user.avatarUrl,
      flashcards: flashcards,
      viewAccess: viewAccess,
      editAccess: editAccess,
      viewPassword: viewPassword,
      editPassword: editPassword,
      created: set.created,
      accessed: set.accessed,
      associatedUserIds: set.associatedUserIds,
      edited: new Date()
    };
    const response = await axios.put(
      `/api/set/${setId}`,
      data, {headers: {'Authorization': `Bearer ${user.token}`}}
    );
    if (
      response.data.userId !== user.user.userId &&
      !response.data.associatedUserIds.includes(user.user.userId)
    ) {
      addToAssociated(set);
    }
  }

  function deleteFlashcard(indexToDelete) {
    let array = flashcards.filter((flashcard) => {
      return flashcard.index !== indexToDelete;
    });
    for (let i = indexToDelete; i < array.length; i++) {
      array[i].index = array[i].index - 1;
    }
    setFlashcards(array);
  }
  function handleSubmit() {
    if (!title || flashcards.length === 0) {
      setErrorText("Twój zestaw musi mieć przynajmniej tytuł i jedną fiszkę.");
      return;
    }
    setId ? replaceSet() : createSet();
    navigate(`/view-set/${setId}`);
  }

  function setAccess(view, edit) {
    setViewAccess(view);
    setEditAccess(edit);
  }

  function setPasswords(view, edit) {
    setViewPassword(view);
    setEditPassword(edit);
  }

  return (
    <>
      <Popup
        show={errorText ? true : false}
        text={errorText}
        onHide={() => setErrorText(null)}
      />
      <AccessManager
        show={showAccessManager}
        viewAccess={viewAccess}
        editAccess={editAccess}
        viewPassword={viewPassword}
        editPassword={editPassword}
        setAccess={setAccess}
        setPasswords={setPasswords}
        onHide={() => setShowAccessManager(false)}
      />
      <div className="mt-5">
        <Container>
          <div style={{display: "flex", justifyContent: "space-between"}} className="mb-2">
            <h2>{setId ? "Edytuj zestaw" : "Stwórz zestaw"}</h2>
            <Button onClick={handleSubmit}>
              {setId ? "Zapisz zmiany" : "Stwórz"}
            </Button>
          </div>
          <Form>
            <Row className="m-auto">
              <Col sm={12}>
                <input
                  type="text"
                  className="text-input"
                  onChange={(e) => setTitle(e.target.value.trim())}
                  placeholder="Tytuł"
                  defaultValue={set.title}
                ></input>
              </Col>
            </Row>
            <Row className="m-auto mt-4">
              <Col sm={12} md={8}>
                <textarea
                  as="textarea"
                  className="text-input"
                  rows={3}
                  placeholder="Opis"
                  onChange={(e) => setDescription(e.target.value.trim())}
                  defaultValue={set.description}
                ></textarea>
              </Col>
            </Row>
            <Row className="m-auto mt-4 mb-3">
              <Col sm={12} md={4}>
                Widoczne
                {viewAccess === "me" && " tylko dla mnie"}
                {viewAccess === "all" && " dla każdego"}
                {viewAccess === "password" && " dla posiadających hasło"}
                <br />
                <span
                  style={{ fontSize: "larger" }}
                  className="link-text"
                  onClick={() => setShowAccessManager(true)}
                >
                  Zmień
                </span>
              </Col>
              <Col sm={12} md={4}>
                Możliwe do edycji
                {editAccess === "me" && " tylko dla mnie"}
                {editAccess === "all" && " dla każdego"}
                {editAccess === "password" && " dla posiadających hasło"}
                <br />
                <span
                  style={{ fontSize: "larger" }}
                  className="link-text"
                  onClick={() => setShowAccessManager(true)}
                >
                  Zmień
                </span>
              </Col>
              <Col sm={12} md={4}>
                <span style={{ fontSize: "larger" }} className="link-text">
                  Importuj z plików Excela (wkrótce)
                </span>
              </Col>
            </Row>
            Fiszki
          </Form>
          {flashcards &&
            flashcards.map((flashcard, index) => {
              return (
                <CreatePhrase
                  key={index}
                  index={index}
                  word={flashcard.word}
                  translation={flashcard.translation}
                  imageUrls={flashcard.imageUrls}
                  editFlashcard={editFlashcard}
                  deleteFlashcard={deleteFlashcard}
                />
              );
            })}
          <div className="p-3" style={{ textAlign: "center" }}>
            <Button onClick={createFlashcard} className="mt-3">
              Dodaj fiszkę
            </Button>
          </div>

          <div
            className="mt-4"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <Button onClick={handleSubmit} size="lg">
              {setId ? "Zapisz zmiany" : "Stwórz"}
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};
export default CreateSet;
