import Card from "react-bootstrap/Card";
import getTimePassedString from "../utils/getTimePassedString";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const SetCard = ({ set, avatarUrl, username }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/view-set/${set._id}`)}
      className="set-card m-3 learn-button"
    >
      <Card.Body>
        <Card.Title>{set.title}</Card.Title>
        <span className="font-background">{set.flashcards.length} pojęć</span>
        {/* <span className="font-background">Ostatnio otwarty {getTimePassedString(set.accessed)}</span> */}
        <Card.Text className="font-regular">{set.description}</Card.Text>
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
