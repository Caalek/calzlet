import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WordPair from "./WordPair";
import { useState, useEffect } from "react";
import WordViewer from "./WordViewer";
import elaImage from "../img/ela.png";
import editImage from "../img/edit.png";
import copyImage from "../img/copy.png";
import flashcardImage from "../img/flashcard.png";
import { Link, useParams } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ConfirmDialogue from "./ConfirmDialogue";
import Popup from "./Popup";
import PasswordPrompt from "./PasswordPrompt";
import Avatar from "./Avatar";

const ViewSet = () => {
  const { user } = useAuth();
  const { setId } = useParams();
  const [set, setSet] = useState();
  const [showDialogue, setShowDialogue] = useState();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState();
  const [canAccess, setCanAccess] = useState();
  const [canEdit, setCanEdit] = useState();

  const [showPasswordPopup, setShowPasswordPopup] = useState();

  useEffect(() => {
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

    axios.get(`/api/set/${setId}`).then((response) => {
      setSet(response.data);
      if (
        user &&
        response.data.userId !== user.user.userId &&
        !response.data.associatedUserIds.includes(user.user.userId) &&
        response.data
      ) {
        addToAssociated(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (set) {
      // const setIdsPasswordAuthorizedArray = JSON.parse(
      //   sessionStorage.getItem("setIdsPasswordAuthorized")
      // );
      // if (user && set.userId === user.user.userId) {
      //   console.log();
      //   setCanAccess(true);
      //   setCanEdit(true);
      // } else if (
      //   setIdsPasswordAuthorizedArray &&
      //   setIdsPasswordAuthorizedArray.includes(set._id)
      // ) {
      //   setCanAccess(true);
      // } else {
      //   checkIfCanAccess(set);
      // }
      // checkIfCanEdit(set);
      checkIfCanAccess(set);
      checkIfCanEdit(set);
    }
  }, [set]);

  async function deleteSet() {
    await axios.delete(`/api/set/${setId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setShowDialogue(false);
    navigate("/your-sets");
  }

  function navigateToEla() {
    if (set.flashcards.length < 4) {
      setErrorText(
        "Twój zestaw musi mieć minimum 4 fiszki, aby móc się go uczyć trybem Eli."
      );
    } else {
      navigate(`/ela-mode/${set._id}`);
    }
  }

  function setHasViewPassword(value) {
    setCanAccess(value);
  }

  function setHasEditPassword(value) {
    setCanEdit(value);
  }

  function checkIfCanAccess(setArg) {
    if (setArg.viewAccess === "all") {
      setCanAccess(true);
    } else if (setArg.viewAccess === "me") {
      if (user && user.user.userId === setArg.userId) {
        setCanAccess(true);
      } else {
        navigate("/");
      }
    } else if (setArg.viewAccess === "password") {
      if (user && user.user.userId === setArg.userId) {
        setCanAccess(true);
      } else {
        setCanAccess(false);
        setShowPasswordPopup(true);
      }
    }
  }

  function checkIfCanEdit(setArg) {
    if (setArg.editAccess === "me") {
      if (user && user.user.userId === setArg.userId) {
        setCanEdit(true);
      } else {
        setCanEdit(false);
      }
    } else if (setArg.editAccess === "password") {
      if (user && user.user.userId === setArg.userId) {
        setCanEdit(true);
      }
    }
  }

  function navigateToEdit() {
    if (!user) {
      setErrorText("Musisz być zalogowany, aby edytować zestawy.")
    }
    else if (canEdit) {
      navigate(`/edit-set/${setId}`);
    } else if (set.editAccess === "password") {
      setShowPasswordPopup(true);
    } else {
      setErrorText("Autor nie pozwala innym edytować tego zestawu.");
    }
  }
  return (
    <>
      <MainNavbar />
      {set && !canAccess && (
        <PasswordPrompt
          show={showPasswordPopup}
          setHasPassword={setHasViewPassword}
          passwordType={"view"}
          setId={setId}
          onHide={() => setShowPasswordPopup(false)}
        />
      )}
      {set && canAccess && (
        <>
          <Popup
            show={errorText ? true : false}
            text={errorText}
            onHide={() => setErrorText(null)}
          />
          <PasswordPrompt
            show={showPasswordPopup}
            setHasPassword={setHasEditPassword}
            passwordType={"edit"}
            setId={setId}
            onHide={() => setShowPasswordPopup(false)}
          />
          <ConfirmDialogue
            show={showDialogue}
            text={
              "Czy na pewno chcesz usunąć ten zestaw? Nie będzie już odwrotu."
            }
            onConfirm={deleteSet}
            onReject={() => setShowDialogue(false)}
          />
          <Container className="mt-2">
            <Row>
              <Col sm={12} md={{ span: 8, offset: 2 }}>
                <h1>{set.title}</h1>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={{ span: 2, offset: 2 }}>
                <div onClick={navigateToEla} className="learn-button p-2 mt-1">
                  <img src={elaImage} alt="" height="30"></img>
                  <span className="m-3" style={{ fontSize: 17 }}>
                    Tryb Eli
                  </span>
                </div>
              </Col>
              <Col xs={6} md={{ span: 2 }}>
                <Link to={`/flashcards/${set._id}`}>
                  <div className="learn-button p-2 mt-1">
                    <img src={flashcardImage} alt="" height="30"></img>
                    <span className="m-3" style={{ fontSize: 18 }}>
                      Fiszki
                    </span>
                  </div>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={{ span: 8, offset: 2 }}>
                <div>
                  <WordViewer
                    flashcards={set.flashcards}
                    lastIndex={set.lastIndex}
                  />
                </div>
                {user && user.userId === set.userId && (
                  <Button className="m-1" onClick={() => setShowDialogue(true)}>
                    Usuń zestaw
                  </Button>
                )}
                <Button className="m-1" onClick={navigateToEdit}>
                  <img
                    src={editImage}
                    alt=""
                    className=""
                    style={{ marginRight: "5px" }}
                    height="17"
                  ></img>
                  Edytuj zestaw
                </Button>
                <Button
                  className="m-1"
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                >
                  <img
                    src={copyImage}
                    alt=""
                    className=""
                    style={{ marginRight: "5px" }}
                    height="17"
                  ></img>
                  Skopiuj link
                </Button>
              </Col>
              <Row className="mb-1 p-2">
                <Col sm={12} md={{ span: 8, offset: 2 }}>
                  <span className="font-background">Autor</span>
                  <Avatar
                    user={{ avatarUrl: set.creatorAvatarUrl }}
                    size="30"
                  />{" "}
                  {set.creatorUsername}
                </Col>
              </Row>
            </Row>
            <Row>
              {set.flashcards.map((pair, index) => {
                return (
                  <WordPair
                    key={index}
                    word={pair.word}
                    translation={pair.translation}
                  />
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
export default ViewSet;
