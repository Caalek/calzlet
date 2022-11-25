import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WordPair from "./WordPair";
import { useState, useEffect } from "react";
import WordViewer from "./WordViewer";
import elaImage from "../img/ela.png";
import editImage from "../img/edit.png";
import copyImage from "../img/copy.png";
import trashImage from "../img/trash.png";
import flashcardImage from "../img/flashcard.png";
import { Link, useParams } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ConfirmDialogue from "./ConfirmDialogue";
import Popup from "./Popup";
import PasswordPrompt from "./PasswordPrompt";
import Avatar from "./Avatar";
import FlashcardViewer from "./FlashCardViewer";
import BlueButton from "./BlueButton";
import "../css/ViewSet.css";
import PhraseList from "./PhraseList";

const ViewSet = () => {
  const { user } = useAuth();
  const { setId } = useParams();
  const [set, setSet] = useState();
  const [showDialogue, setShowDialogue] = useState();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState();
  const [canAccess, setCanAccess] = useState();
  const [canEdit, setCanEdit] = useState();
  const [share, setShare] = useState();

  const [visible, setVisible] = useState(false)

  const [showPasswordPopup, setShowPasswordPopup] = useState();

  useEffect(() => {
    async function fetchData() {
    const addShare = async (userId, setId, setTitle, username, avatarUrl) => {
      const shareData = {
        userId: userId,
        setId: setId,
        title: setTitle,
        username: username,
        avatarUrl: avatarUrl,
      };

      const response = await axios.post("/api/share", shareData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setShare(response.data.share)
    };

    const fetchShare = async () => {
      const params = {
        userId: user.userId,
        setId: setId
      }
      const response = await axios.get("/api/shares", {params: params, 
        headers: { Authorization: `Bearer ${user.token}`}});
      return response
    }

    const fetchSet = async () => {
      const fetchedSet = await axios.get(
        `/api/set/${setId}`
      );
      setSet(fetchedSet.data);
      return fetchedSet
    };
  
    const response = await fetchSet()
    if (user) {
      const shareResponse = await fetchShare()
      if (
        response.data.userId !== user.userId &&
        shareResponse.data.length === 0 &&
        response.data
      ) {
        addShare(user.userId, setId, response.data.title, response.data.creatorUsername, response.data.creatorAvatarUrl)
        setVisible(true)
      } else {
        if (user) {
          setShare(shareResponse.data[0])
          setVisible(true)
        }
      }
    } else {
      setVisible(true)
    }
  }
    fetchData()
  }, [setSet, setShare]);

  useEffect(() => {
    if (set) {
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
    if (set.flashcards.length < 7) {
      setErrorText(
        "Twój zestaw musi mieć minimum 7 fiszek, aby móc się go uczyć trybem Eli."
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
      if (user && user.userId === setArg.userId) {
        setCanAccess(true);
      } else {
        navigate("/");
      }
    } else if (setArg.viewAccess === "password") {
      if (user && user.userId === setArg.userId) {
        setCanAccess(true);
      } else {
        setCanAccess(false);
        setShowPasswordPopup(true);
      }
    }
  }

  function checkIfCanEdit(setArg) {
    if (setArg.editAccess === "me") {
      if (user && user.userId === setArg.userId) {
        setCanEdit(true);
      } else {
        setCanEdit(false);
      }
    } else if (setArg.editAccess === "password") {
      if (user && user.userId === setArg.userId) {
        setCanEdit(true);
      }
    }
  }

  function navigateToEdit() {
    if (!user) {
      setErrorText("Musisz być zalogowany, aby edytować zestawy.");
    } else if (canEdit) {
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
      {visible && canAccess && (
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
          <Container>
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
              <WordViewer
                flashcards={set.flashcards}
                lastIndex={share ? share.lastIndex : 0}
              />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col sm={12} md={{ span: 8, offset: 2 }}>
                <div className="set-button-container mt-1">
                  {user && user.userId === set.userId && (
                    <BlueButton
                      iconSrc={trashImage}
                      onClick={() => setShowDialogue(true)}
                      text="Usuń zestaw"
                    />
                  )}
                  <BlueButton
                    iconSrc={editImage}
                    onClick={navigateToEdit}
                    text="Edytuj zestaw"
                  />
                  <BlueButton
                    iconSrc={copyImage}
                    onClick={() =>
                      navigator.clipboard.writeText(window.location.href)
                    }
                    text="Skopiuj link"
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col sm={12} md={{ span: 8, offset: 2 }}>
                <span className="font-background">Autor</span>
                <div className="author">
                  <Avatar user={{ avatarUrl: set.creatorAvatarUrl }} size="40" />
                  {set.creatorUsername}
                </div>
              </Col>
            </Row>
            <Row>
              <PhraseList items={set.flashcards} />
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
export default ViewSet;
