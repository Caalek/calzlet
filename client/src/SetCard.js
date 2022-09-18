import Card from "react-bootstrap/Card";

const SetCard = (props) => {
  return (
    <Card className="set-card">
      <Card.Body>
        <Card.Title>{props.set.name}</Card.Title>
        {props.set.words.length} pojęć
        {props.set.description}
      </Card.Body>
    </Card>
  );
};

export default SetCard;
