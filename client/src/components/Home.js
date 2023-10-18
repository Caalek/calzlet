import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import RegisterForm from "./RegisterForm"
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
          <p>Calzlet to aplikacja z fiszkami do nauki języków. Nie jest kompletna i mogę pojawić się w niej błędy, ale jest używalna. Zapraszam do przetestowania.</p>
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
