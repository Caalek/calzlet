import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import axios from "axios"

const PasswordPrompt = ({ passwordType, setId, setHasPassword }) => {
  const [typedPassword, setTypedPassword] = useState();
  const [errorText, setErrorText] = useState();
  const navigate = useNavigate();

  const checkPassword = async () => {
    const data = {
      password: typedPassword,
    };
    const response = await axios.post(
      `http://localhost:5000/api/check-view-password/${setId}`,
      data
    );
    console.log(response)
    if (response.data.message === "success") {
      setHasPassword(true);
    } else {
      setErrorText("Błędne hasło.");
    }
  };

  return (
    <>
      <Popup
        show={errorText ? true : false}
        text={errorText}
        onHide={() => setErrorText(null)}
      />
      <Container className="mt-5">
        Aby
        {passwordType === "edit" && " edytować"}
        {passwordType === "view" && " zobaczyć"}
        {" ten zestaw, musisz wpisać hasło."}
        <input
          type="password"
          className="text-input"
          placeholder="Hasło"
          onChange={(e) => setTypedPassword(e.target.value)}
        ></input>
        <Button onClick={checkPassword}>Ok</Button>
      </Container>
    </>
  );
};
export default PasswordPrompt;
