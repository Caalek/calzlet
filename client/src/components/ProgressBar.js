import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

import "../css/ProgressBar.css";
import arrowLeft from "../img/arrow-left.png"
import { useNavigate } from "react-router-dom";

const ProgressBar = ({ title, setId, complete, all }) => {
  const navigate = useNavigate()

  return (
    <>
      <Row className="p-2">
        <Col xs={1}>
          <img
            className="mt-2"
            src={arrowLeft}
            onClick={() => navigate(`/view-set/${setId}`)}
            height="25"
            alt="strzałka w lewo"
          ></img>
        </Col>
        <Col xs={10}>
          <div style={{ textAlign: "center" }}>
            <div>
              {complete + " / " + all}
            </div>
            {title}
          </div>
        </Col>
      </Row>
      <span
        className="progress-bar"
        style={{
          width: `${Math.round((complete / all) * 100)}%`,
        }}
      ></span>
    </>
  );
};

export default ProgressBar;
