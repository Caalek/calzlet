import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <Navbar variant="dark" className="glowny-navbar" expand="lg">
      <Container>
        <Navbar.Brand style={{ fontSize: 30 }}>Calzlet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/your-sets">Twoje zestawy</Nav.Link>
              <Nav.Link href="/create-set">Stwórz zestaw</Nav.Link>
              
            </Nav>
            <Nav className="justify-content-end">
              <Button>Log out</Button>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MainNavbar;
