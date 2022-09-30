import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";

const MainNavbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    navigate("/");
  };
  return (
    <Navbar variant="dark" className="glowny-navbar" expand="lg">
      <Container>
        <Navbar.Brand style={{ fontSize: 30 }}>
          <Link to="/">Calzlet</Link>
        </Navbar.Brand>
        {user ? (
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/your-sets">
                  Twoje zestawy
                </Nav.Link>
                <Nav.Link as={Link} to="/create-set">
                  Stwórz zestaw
                </Nav.Link>
              </Nav>
              <Nav className="justify-content-end m-3">
                {user && `Zalogowano jako: ${user.email}`}
              </Nav>
              <Nav className="justify-content-end">
                {user && <Button onClick={logoutUser}>Wyloguj</Button>}
              </Nav>
            </Navbar.Collapse>
          </div>
        ) : <Button onClick={() => navigate("/login")}>Zaloguj się</Button>}
      </Container>
    </Navbar>
  );
};
export default MainNavbar;
