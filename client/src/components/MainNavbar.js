import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";
import Avatar from "./Avatar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import VerifyEmailPrompt from "./VerifyEmailPrompt";
import "../css/MainNavbar.css"

const MainNavbar = () => {
  const { user, setUser } = useAuth();
  const [dimensions, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    navigate("/");
  };

  const expand = "sm";
  return (
    <>
    {user && !user.verified && <VerifyEmailPrompt />}
      <Navbar
        key={expand}
        bg="dark"
        variant="dark"
        expand={expand}
        className="mb-3"
      >
        <Container>
          <Navbar.Brand style={{ fontSize: 25 }}>
            <Link to="/">Calzlet</Link>
            <span className="m-1 link-text" style={{ fontSize: "small" }}>
              BETA
            </span>
          </Navbar.Brand>
          {user && (
            <>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                bg="dark"
                variant="dark"
                className="text-white"
              >
                <Offcanvas.Header closeButton closeVariant="white">
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <Navbar.Brand style={{ fontSize: 25 }}>
                      <Link to="/">Calzlet</Link>
                      <span
                        className="m-1 link-text"
                        style={{ fontSize: "small" }}
                      >
                        BETA
                      </span>
                    </Navbar.Brand>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body bg="dark">
                  {dimensions.winWidth > 1000 ?
                  <>
                  <Nav className="justify-content-begin flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/create-set">
                    Stwórz zestaw
                  </Nav.Link>
                  <Nav.Link as={Link} to="/your-sets">
                    Twoje zestawy
                  </Nav.Link>
                  </Nav>
                  <NavDropdown
                    title={<Avatar user={user} size={35} />}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    align="end"
                  >
                    <NavDropdown.Item disabled>
                      <div style={{ fontSize: "small" }}>Zalogowano jako</div>
                      <div style={{ display: "flex" }}>
                        <div className="p-1">
                          <Avatar user={user} size={30} />
                        </div>
                        <div className="text-white p-1">
                          {user.username}
                        </div>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/settings">
                      Ustawienia
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutUser}>
                      Wyloguj
                    </NavDropdown.Item>
                  </NavDropdown>
                  </>
                  :
                  <div style={{textAlign: "center", fontSize: "large"}}>
                    <Button className="p-3" as={Link} to="/create-set" style={{fontSize: "large", width: "100%"}}>
                      Stwórz zestaw
                    </Button>
                  <Nav.Link as={Link} to="/your-sets" className="p-3 mt-2">
                    Twoje zestawy
                  </Nav.Link>
                  <Nav.Link as={Link} to="/settings" className="p-3">
                    Ustawienia
                  </Nav.Link>
                  <div className="p-2">
                    <div style={{ fontSize: "small" }}>Zalogowano jako</div>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="p-">
                          <Avatar user={user} size={30} />
                        </div>
                        <div className="text-white p-1">
                          {user.username}
                        </div>
                      </div>
                  </div>
                  <Button onClick={logoutUser}>Wyloguj się</Button>
                  </div>}
                  
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </>
          )}
          {!user && <Button as={Link} to="/login">Zaloguj się</Button>}
        </Container>
      </Navbar>
    </>
  );
};
export default MainNavbar;
