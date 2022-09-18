import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WordPair from "./WordPair";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WordViewer from "./WordViewer";
import learnImage from "./img/learn.png";
import  { Link } from "react-router-dom"
import MainNavbar from "./MainNavbar";

const ViewSet = () => {
  const [flashcards, setFlashcards] = useState({
    title: "Hiszpański słówka",
    description: "Test desc",
    flashcards: [
      {
        word: "el tiburón",
        translation: "rekin",
      },
      {
        word: "la calefacción",
        translation: "ogrzewanie",
      },
      {
        word: "el lavaplatos",
        translation: "zmywarka",
      },
    ],
  });

  return (
    <div>
    <MainNavbar />
    <Container className="mt-5">
      <Row>
        <Col sm={12} md={{ span: 8, offset: 2 }}>
          <h1>{flashcards.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 3, offset: 2 }}>
          <div className="learn-button p-2">
            {/* <img src={learnImage} height="40"></img> */}
            <span className="m-3" style={{ fontSize: 17 }}>
              Ucz się (tryb Eli)
            </span>
          </div>
        </Col>
        <Col md={{ span: 3 }}>
          <Link to="/flashcards">
            <div className="learn-button p-2">
            {/* <img src={learnImage} height="40"></img> */}
            <span className="m-3" style={{ fontSize: 17 }}>
              Fiszki
            </span>
            </div>
          </Link>
        </Col>
      </Row>
      {/* <Row>
        <Col sm={12} md={{ span: 8, offset: 2 }}>
          <WordViewer words={flashcards.words} />
        </Col>
      </Row> */}
      <Row>
        {flashcards.flashcards.map((pair) => {
          return (
            <WordPair
              key={uuidv4()}
              word={pair.word}
              translation={pair.translation}
            />
          );
        })}
      </Row>
    </Container>
  </div>
  );
}
export default ViewSet;