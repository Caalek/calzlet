import Container from "react-bootstrap/Container"
import WordViewer from "./WordViewer";
import { useState } from "react";
import FlashcardViewer from "./FlashCardViewer";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import MainNavbar from "./MainNavbar";

const FullScreenFlashcards = () => {
    const [flashcards, setFlashcards] = useState({
        title: "Hiszpański słówka",
        description: "Test desc",
        words: [
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
        <Container>
            <FlashcardViewer title={flashcards.title} words={flashcards.words} />
        </Container>
    )
}
export default FullScreenFlashcards;