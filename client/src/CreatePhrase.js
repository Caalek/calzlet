import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import trashImage from "./img/trash.png"

const CreatePhrase = (props) => {
  return (
    <div className="p-3 mt-3 fraza">
      <Form>
        <div className="p-2 mb-2">
          <div className="justify-content-begin">
            {props.index + 1}
          </div>
          <div className="justify-content-end">
            {/* <img src={trashImage} alt="" height="15"></img> */}
            usuń
          </div>
        </div>
        <Row>
          <Col sm={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Pojęcie"
              className="fraza-input"
              defaultValue={props.word}
              onChange={(e) => {
                props.editFlashcard(props.index, "word", e.target.value);
              }}
            ></Form.Control>
            <div className="podpis mt-1">POJĘCIE</div>
          </Col>
          <Col sm={12} md={6}>
            <Form.Control
              className="fraza-input"
              type="text"
              placeholder="Definicja"
              defaultValue={props.translation}
              onChange={(e) => {
                props.editFlashcard(props.index, "translation", e.target.value);
              }}
            ></Form.Control>
            <div className="podpis mt-1">DEFINICJA</div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default CreatePhrase;
