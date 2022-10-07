import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WordPair from "./WordPair";
import { useState, useEffect, useContext } from "react";
import WordViewer from "./WordViewer";
import learnImage from "../img/learn.png";
import { Link, useParams, useSearchParams } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import axios from "axios";
import UserContext from "../context/UserContext";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ConfirmDialogue from "./ConfirmDialogue";
import Popup from "./Popup";
import PasswordPrompt from "./PasswordPrompt";

const ViewSet = () => {
  const { user, setUser } = useContext(UserContext);
  const { setId } = useParams();
  const [set, setSet] = useState();
  const [showDialogue, setShowDialogue] = useState();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState();
  const [canAccess, setCanAccess] = useState()


  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(
        `http://localhost:5000/api/set/${setId}`
      );
      setSet(fetchedSet.data);
    };
    fetchSets();
  }, []);

  useEffect(() => {
    if (set) {
      const setIdsPasswordAuthorizedArray = JSON.parse(sessionStorage.getItem("setIdsPasswordAuthorized"))
      if (setIdsPasswordAuthorizedArray && setIdsPasswordAuthorizedArray.includes(set._id)) {
        setCanAccess(true)
      } else {
        checkIfCanAccess(set)
      }
    }
  }, [set])

  async function deleteSet() {
    await axios.delete(`http://localhost:5000/api/set/${setId}`);
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

  function setHasPassword(value) {
    setCanAccess(value)
  }

  function checkIfCanAccess(setArg) {
    if (setArg.viewAccess === "all") {
      setCanAccess(true)
    } else if (setArg.viewAccess === "me") {
      if (user && user.userId === setArg.userId) {
        setCanAccess(true)
      } else {
        navigate("/")
      }
    } else if (setArg.viewAccess === "password") {
      if (user && user.userId === setArg.userId) {
        setCanAccess(true)
      }
    }
  }

  function checkIfCanEdit(setArg) {
    if (setArg.editAccess === "all") {
      return true
    } else if (setArg.editAccess === "me") {
      if (user && user.userId === setArg.userId) {
        return true
      } else {
        return false
      }
    } else if (setArg.editAccess === "password") {
      if (user && user.userId === setArg.userId) {
        return true
      }
    }
  }

  if (set && canAccess) {
    return (
      <>
        <Popup
          show={errorText ? true : false}
          text={errorText}
          onHide={() => setErrorText(null)}
        />
        <ConfirmDialogue
          show={showDialogue}
          text={
            "Czy na pewno chcesz usunąć ten zestaw? Nie będzie już odwrotu."
          }
          onConfirm={deleteSet}
          onReject={() => setShowDialogue(false)}
        />
        <MainNavbar />
        <Container className="mt-5">
          <Row>
            <Col sm={12} md={{ span: 8, offset: 2 }}>
              <h1>{set.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 3, offset: 2 }}>
              <div onClick={navigateToEla} className="learn-button p-2">
                <span className="m-3" style={{ fontSize: 17 }}>
                  Tryb Eli
                </span>
              </div>
            </Col>
            <Col md={{ span: 3 }}>
              <Link to={`/flashcards/${set._id}`}>
                <div className="learn-button p-2">
                  {/* <img src={learnImage} height="40"></img> */}
                  <span className="m-3" style={{ fontSize: 17 }}>
                    Fiszki
                  </span>
                </div>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={{ span: 8, offset: 2 }}>
              <div>
                <WordViewer flashcards={set.flashcards} />
              </div>
              {user && user.userId === set.userId && (
                <Button className="m-1" onClick={() => setShowDialogue(true)}>
                  Usuń zestaw
                </Button>
              )}
              {checkIfCanEdit(set) &&
              <Button
                className="m-1"
                onClick={() => navigate(`/edit-set/${setId}`)}
              >
                Edytuj zestaw
              </Button>
              }
              <Button
                className="m-1"
                onClick={() => navigator.clipboard.writeText(`http://localhost:3000/view-set/${set._id}`)}
              >
                Skopiuj link 
              </Button>
            </Col>
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
    );
  } else if (set && !canAccess && set.viewAccess === "password") {
    return <PasswordPrompt setHasPassword={setHasPassword} passwordType="view" setId={set._id} />
  } else {
    return <></>;
  }
};
export default ViewSet;
