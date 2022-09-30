import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Popup from "./Popup"

const RegisterForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState()
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorText("Wypełnij formularz, zanim go wyślesz.")
    }
    if (!email.match(emailRegex)) {
      setErrorText("Wpisz prawidłowy adres email.")
      return
    }
    if (!validatePassword()) {
      setErrorText("Wpisz odpowiednie hasło.")
      return
    }
    //REGISTER/LOGIN API CALL
  };

  const validatePassword = () => {
    if (password.length >= 8 &&
      password.match(/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/) &&
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
          onFocus={() => setShowPasswordRequirements(true)}
          onBlur={() => setShowPasswordRequirements(false)}
        ></input>
        <span style={{fontSize: "small"}}>Hasło musi mieć minimum 8 znaków, cyfrę i znak specjalny.</span>
        {/* {showPasswordRequirements &&
        <div>
          Hasło musi mieć:
        <div className={password && password.length >= 8 ? "font-green" : "font-background"}>Minimum 8 znaków</div>
        <div className={password && password.match(/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/) ? "font-green" : "font-background"}>Minimum 1 znak specjalny</div>
        <div className={password && password.match(/\d/) ? "font-green" : "font-background"}>Minimum 1 cyfrę</div>
        </div>
        }  */}
        <Button className="mt-3" type="submit">
          Zajerestruj się
        </Button>
      </form>
    </>
  );
};
export default RegisterForm;
