import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const SetCard = (props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/view-set/${props.set._id}`)}
      className="set-card m-3 learn-button"
    >
      <Card.Body>
        <Card.Title>{props.set.title}</Card.Title>
        <span className="font-background">{props.set.flashcards.length} pojęć</span>
        <Card.Text className="font-regular">{props.set.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SetCard;
