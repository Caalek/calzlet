import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../css/ProgressBar.css";
import arrowLeft from "../img/arrow-left.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../utils/axios";

const ProgressBar = ({ title, setId, complete, all }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const leaveSet = async () => {
    if (user) {
      const params = {
        userId: user.userId,
        setId: setId,
      };
      const patchObject = {
        accessed: new Date(),
      };
      if (location.pathname.includes("ela-mode")) {
        patchObject.lastElaIndex = complete;
      } else {
        patchObject.lastIndex = complete;
      }
      await axios.patch("/api/share", patchObject, {
        params: params,
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }
    navigate(`/view-set/${setId}`);
  };

  return (
    <>
      <Row className="p-2">
        <Col xs={1}>
          <img
            className="mt-2"
            src={arrowLeft}
            onClick={leaveSet}
            height="25"
            alt="strzałka w lewo"
          ></img>
        </Col>
        <Col xs={10}>
          <div style={{ textAlign: "center" }}>
            <div>{`${complete + 1} / ${all}`}</div>
            {title}
          </div>
        </Col>
      </Row>
      <span
        className="progress-bar"
        style={{
          width: `${Math.round((complete + 1) / all * 100)}%`,
        }}
      ></span>
    </>
  );
};

export default ProgressBar;
