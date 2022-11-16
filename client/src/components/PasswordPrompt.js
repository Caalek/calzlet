import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import axios from "axios";
import MainNavbar from "./MainNavbar";
import useAuth from "../hooks/useAuth";
import Modal from "react-bootstrap/Modal";

const PasswordPrompt = ({
  passwordType,
  setId,
  setHasPassword,
  onHide,
  show,
}) => {
  const [typedPassword, setTypedPassword] = useState();
  const [errorText, setErrorText] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const checkPassword = async () => {
    const data = {
      password: typedPassword,
    };
    let response;
    if (passwordType === "view") {
      response = await axios.post(`/api/check-view-password/${setId}`, data);
    } else {
      response = await axios.post(`/api/check-edit-password/${setId}`, data);
    }
    if (response.data.message === "success") {
      const passwordsEntered = JSON.parse(
        sessionStorage.getItem("setIdsPasswordAuthorized")
      );
      sessionStorage.setItem(
        "setIdsPasswordAuthorized",
        JSON.stringify([setId].concat(passwordsEntered))
      );
      setHasPassword(true);
      onHide();
    } else {
      setErrorText("Błędne hasło.");
    }
  };

  return (
    <>
      <div className="popup">
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={false}
          className="popup"
        >
          <Modal.Body>
            <Popup
              show={errorText ? true : false}
              text={errorText}
              onHide={() => setErrorText(null)}
            />
            <div className="p-3" style={{fontSize: "large"}}>
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
            <Button className="mt-1" onClick={checkPassword}>
              Kontynnuj
            </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default PasswordPrompt;
