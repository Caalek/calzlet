import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

const CsvImporter = (props) => {
  const [separator, setSeparator] = useState("tab");
  const [flashcardString, setFlashcardString] = useState(null)

  const getPlaceholder = () => {
    let result = "";
    for (let i = 0; i < 3; i++) {
      if (separator === "tab") {
        result += `Pojęcie${i + 1}${"  "}Definicja${i + 1}\n`;
      } else if (separator === "coma") {
        result += `Pojęcie${i + 1},Definicja${i + 1}\n`;
      }
    }
    return result;
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
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
              <div>Pomiędzy spacją i definicją: </div>
              <select
                className="select-input"
                onChange={(e) => setSeparator(e.target.value)}
              >
                <option value="tab">tabulator</option>
                <option value="coma">przecinek</option>
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button disabled={flashcardString ? false : true}>Importuj</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CsvImporter;
