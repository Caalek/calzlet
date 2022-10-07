import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useContext } from "react";
import UserContext from "../context/UserContext";
import RegisterForm from "./RegisterForm"
import Footer from "./Footer";

const Home = () => {
  const { user, setUser } = useContext(UserContext)
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="mt-5">
        <div id="googleSignIn"></div>
          {/* <Col sm={12} md={6}>
            <div className="mt-5 justify-content-center">
              <span style={{fontSize: 65}}>
              Quizlet, ale lepszy.</span>
              <p style={{fontSize: 20}}>Bo w pełni darmowy.</p>
              {!user && <div id="googleSignIn"></div>}
            </div>
          </Col> */}
          {/* <Col sm={12} md={6}>
            <h3>To przecież kopia Quizleta!</h3>
            <p>I co z tego? Właściciele Quizleta i tak nigdy się nie dowiedzą o tej nic nie znaczącej stronce, a ci, którzy ją znają otrzymują znaczące korzyści. Jakie?</p>
            <ul>
            <li>Dodawanie własnych obrazów do zestawu</li>
            <li>Specjalny tryb "Ela mode" opracowany przez Elę Ambrzykowską dla optymalnego wkuwania słówek</li>
            <li>Regularne aktualizacje z nowymi funkcjami.</li>
            </ul>
            <p>Gotowy na nowego, lepszego Quizleta? Zajerestruj się.</p>
          </Col> */}
          <Col sm={12} md={6}>
            <RegisterForm />
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
}
export default Home;