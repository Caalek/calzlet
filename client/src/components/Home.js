import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
// import RegisterForm from "./RegisterForm"
import Footer from "./Footer";

const Home = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate("/your-sets")
    }
  }, [user])
  return (
    <div>
      <MainNavbar />
      <Container>
        <Row className="mt-5">
          <Col sm={12} md={6}>
            {/* <RegisterForm /> */}
            <h1>Coming soon™</h1>
            <p>Aplikacja nie jest jeszcze ogólnodostępna. Jeśli chcesz zostać beta testerem, napisz na <strong>calzletapp@gmail.com</strong></p>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
}
export default Home;