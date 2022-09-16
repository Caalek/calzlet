import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useContext } from "react";
import UserContext from "./UserContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext)
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <div className="mt-5 justify-content-center">
              <span style={{fontSize: 65}}>
              Quizlet, ale lepszy.</span>
              <p style={{fontSize: 20}}>Bo w pełni darmowy.</p>
              {!user && <div id="googleSignIn"></div>}
            </div>
          </Col>
          <Col sm={12} md={6}>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;