import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const SetCard = ({ title, setId, avatarUrl, username }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/view-set/${setId}`)}
      className="set-card m-3 learn-button"
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {/* <span className="font-background">{set.flashcards.length} pojęć</span> */}
        {/* <Card.Text className="font-regular">{set.description}</Card.Text> */}
      </Card.Body>
      <Card.Footer>
        <div>
            <Avatar user={{avatarUrl: avatarUrl}} size={30}/>
            {username}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default SetCard;
