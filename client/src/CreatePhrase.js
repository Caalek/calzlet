import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreatePhrase = (props) => {
  return (
    <div className="p-3 mt-3 fraza">
      <Form>
        <Row>
          <Col sm={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Pojęcie"
              defaultValue={props.word}
              onChange={(e) => {
                props.editFlashcard(props.id, "word", e.target.value);
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
                props.editFlashcard(props.id, "translation", e.target.value);
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
