import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Footer from "./Footer";
import MainNavbar from "./MainNavbar";
import Popup from "./Popup"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"
import UserContext from "../context/UserContext"
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState()
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorText("Wypełnij formularz, zanim go wyślesz.")
      return
    }
    const data = {
      email: email,
      password: password,
    }
    const response = await axios.post("http://localhost:5000/api/login", data)
    if (response.data.auth) {
      setProfile(response)
      navigate("/your-sets")
    } else {
      setErrorText("Niepoprawny email lub hasło.")
    }
  };

  const setProfile = (response) => {
    let user = jwtDecode(response.data.token).user
    console.log(user)
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);;
  }



  return (
    <>
    <MainNavbar />
    <Container>
      <Popup
          show={errorText ? true : false}
          text={errorText}
          onHide={() => setErrorText(null)}
        />
        <Row>
          <Col sm={12} md={{span: 6, offset: 3}}>
        <form onSubmit={handleSubmit} className="mt-5 login-form">
          <h3>Zaloguj się </h3>
          <input
            type="text"
            className="mt-3 text-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            className="mt-3 text-input"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div style={{display: "flex", width: "100%", gap: "10px"}}>
          <Button className="mt-3" type="submit">
            Zaloguj się
          </Button>
          <span className="mt-4">lub</span>
          <div id="googleSignIn" className="mt-3"></div>
          </div>
        </form>
        </Col>
        </Row>
        <Footer />
      </Container>
    </>
  );
};
export default LoginForm;
