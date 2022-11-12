import uuid from "react-uuid"
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import WordPair from "./WordPair";

const CsvImporter = ({ show, onHide, bulkAddFlashcards }) => {
  const [separator, setSeparator] = useState("\t");
  const [flashcardString, setFlashcardString] = useState(null);

  const getPlaceholder = () => {
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += `Słówko${i + 1}${separator}Definicja${i + 1}\n`;
    }
    return result;
  };

  const addImportedToSet = () => {
    let arrayToBeAdded = []
    for (let flashcard of flashcardString.split("\n")) {
      arrayToBeAdded.push({
        word: flashcard.split(separator)[0],
        translation: flashcard.split(separator)[1],
        imageUrl: "",
        _id: uuid()
      });
    }
    bulkAddFlashcards(arrayToBeAdded)
    onHide()
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
        className="popupp"
      >
        <Modal.Body>
          <div className="m-3">
            <h3>Importuj fiszki</h3>
            <span className="font-background mb-1">
              Importuj fiszki z Excela, Google Sheets itd. Skopiuj dane i wklej
              w poniższe pole.
            </span>
            <textarea
              className="text-input"
              rows={4}
              placeholder={getPlaceholder()}
              onChange={(e) => setFlashcardString(e.target.value)}
            ></textarea>
            <div className="mt-3">
              <div>Pomiędzy słówkiem a definicją: </div>
              <select
                className="select-input"
                onChange={(e) => setSeparator(e.target.value)}
              >
                <option value={"\t"}>tabulator</option>
                <option value=",">przecinek</option>
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button disabled={flashcardString ? false : true} onClick={addImportedToSet}>
                Importuj
              </Button>
            </div>
            Podgląd importu
            {flashcardString &&
              flashcardString.split("\n").map((line, index) => {
                return (
                  <WordPair
                    key={index}
                    word={line.split(separator)[0]}
                    translation={line.split(separator)[1]}
                  />
                );
              })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CsvImporter;
