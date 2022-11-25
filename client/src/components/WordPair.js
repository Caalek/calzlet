import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/WordPair.css"

const WordPair = ({ word, translation}) => {
  return (
    <div className="word-pair p-3 m-1">
      <Row>
        <Col sm={6}>{word}</Col>
        <Col sm={6}>{translation}</Col>
      </Row>
    </div>
  );
};
export default WordPair;
