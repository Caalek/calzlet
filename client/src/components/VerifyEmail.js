import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"

const VerifyEmail = () => {
  const { emailVerifyToken } = useParams();
  const [success, setSuccess] = useState();
  const { user, setUser } = useContext(UserContext);
        
  useEffect(() => {
    axios.get(`/api/verify-email/${emailVerifyToken}`).then((response) => {
      if (response.status === 200) {
        setUser(null);
        localStorage.clear();
        setSuccess(true);
      }
    });
  }, []);

  return (
    <>
      {success && (
        <Container cla>
          <Row className="text-center mt-5">
            <Col md={{span: 6, offset: 3}}>
            <h1>Sukces</h1>
            <div>Email zweryfikowany pomyślnie, zaloguj się ponownie.</div>
            <Button as={Link} to="/login" className="mt-3">
              Zaloguj się
            </Button>
            </Col>
          </Row>
        </Container>
      )
    }
    </>
  );
};
export default VerifyEmail;
