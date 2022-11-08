import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Avatar from "./Avatar";

const MainNavbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    navigate("/");
    localStorage.clear()
  };

  return (
    <Navbar variant="dark" className="glowny-navbar" expand="md">
      <Container>
        <Navbar.Brand style={{ fontSize: 25 }}>
          <Link to="/">Calzlet</Link>
          <span className="m-1 link-text" style={{ fontSize: "small" }}>
            BETA
          </span>
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
                {/* <Nav.Link as={Link} to="/settings">
                  Ustawienia
                </Nav.Link> */}
              </Nav>
              <NavDropdown title={<Avatar size={40} />} className="ml-2" align="end">
                <NavDropdown.Item eventKey={1}>
                  <Nav.Link as={Link} to="/settings">
                    Ustawienia
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={2}>
                  <div onClick={logoutUser}>
                    {user && <Button >Wyloguj</Button>}
                  </div>
                  Wyloguj się
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </div>
        ) : (
          <Button onClick={() => navigate("/login")}>Zaloguj się</Button>
        )}
      </Container>
    </Navbar>
  );
};
export default MainNavbar;
