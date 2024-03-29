import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Popup from "./Popup";
import axios from "../utils/axios";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hcaptchaToken, setHcaptchaToken] = useState();
  const [errorText, setErrorText] = useState();
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorText("Wypełnij formularz, zanim go wyślesz.")
    }
    if (!email.match(emailRegex)) {
      setErrorText("Wpisz prawidłowy adres email.")
      return
    }
    if (!validatePassword()) {
      setErrorText("Wpisz odpowiednie hasło. Musi mieć minimum 8 znaków, cyfrę i znak specjalny.")
      return
    }
    if(await checkIfSpamEmail(email)) {
      setErrorText("Nie używaj śmieciowych maili, to porządna strona :)")
      return
    }

    if (!hcaptchaToken) {
      setErrorText("Wypełnij captchę.")
      return
    }
    const data = {
      email: email,
      password: password,
      token: hcaptchaToken
    }
    const response = await axios.post("/api/register", data)
    if (response.data.message === "success") {
      setUser(response.data.user)
      navigate("/your-sets")
    } else {
      setErrorText("Wystąpił błąd.")
    }
  };
  
  const checkIfSpamEmail = async (email) => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/unkn0w/disposable-email-domain-list/main/domains.json"
    )
    const spamList = response.data
    for (let spamDomain of spamList) {
      if (email.split("@")[1] === spamDomain) {
        return true
      } 
    }
    return false
  };

  const validatePassword = () => {
    if (password.length >= 8 &&
      password.match(/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/) && //eslint-disable-line
      password.match(/\d/)
      ) {
        return true
      }
    return false
  }
  return (
    <>
    <Popup
        show={errorText ? true : false}
        text={errorText}
        onHide={() => setErrorText(null)}
      />
      <h3>Zajerestruj się </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="mt-3 text-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className=" mt-3 text-input"
          placeholder="Hasło"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <span style={{fontSize: "small"}}>Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.</span>
        <br/>
        <HCaptcha sitekey="fb9704c6-c27d-4c71-984a-64a8e332fea5"
        onVerify={(token, ekey) => setHcaptchaToken(token)}>
        </HCaptcha>
        <Button className="mt-3" type="submit">
          Zajerestruj się
        </Button>
      </form>
    </>
  );
};
export default RegisterForm;
