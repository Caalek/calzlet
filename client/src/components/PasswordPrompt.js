import { useCallback, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import axios from "axios"
import MainNavbar from "./MainNavbar";
import UserContext from "../context/UserContext";

const PasswordPrompt = ({ passwordType, setId, setHasPassword }) => {
  const [typedPassword, setTypedPassword] = useState();
  const [errorText, setErrorText] = useState();
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  const checkPassword = async () => {
    const data = {
      password: typedPassword,
    };
    const response = await axios.post(
      `http://localhost:5000/api/check-view-password/${setId}`,
      data, {headers: {'Authorization': `Bearer ${user.token}`}}
    );
    console.log(response)
    if (response.data.message === "success") {
      const passwordsEntered = JSON.parse(sessionStorage.getItem("setIdsPasswordAuthorized"))
      sessionStorage.setItem("setIdsPasswordAuthorized", JSON.stringify([setId].concat(passwordsEntered)))
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
      <MainNavbar />
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
