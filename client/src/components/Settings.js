import { useContext } from "react"
import UserContext from "../context/UserContext"
import MainNavbar from "./MainNavbar"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const Settings = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <MainNavbar />
      <Container className="mt-5">
        <Row>
          <h3>Konto</h3>
          <Col sm={12} md={6}>
            <div className="settings-div p-3">
              <h5>Zmień email</h5>
              <span className="font-background"> Twój obecny email to {user.email}</span>
              <input className="text-input" placeholder="Wpisz nowy email"></input>
              <input className="text-input" placeholder="Wpisz swoje hasło"></input>
              <Button className="">Zatwierdź</Button>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className="settings-div p-3">
              <h5>Zmień hasło</h5>
              <input className="text-input" type="password" placeholder="Wpisz obecne hasło"></input>
              <input className="text-input" placeholder="Wpisz nowe hasło"></input>
              <Button className="">Zatwierdź</Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col sm={12} md={6}>
            <div className="settings-div p-3">
              <h5 style={{color: "#ff725b"}}>Usuń konto</h5>
              <span className="font-background">Usunięcie konta spowoduje bezpowrotne usunięcie również wszystkich Twoich zestawów.</span>
              <br />
              <Button variant="danger">Rozumiem, chce usunąć konto</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Settings