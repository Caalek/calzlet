import axios from "../utils/axios";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";

import Popup from "./Popup";
import useAuth from "../hooks/useAuth";

const UpdatePasswordForm = () => {
  const { user, setUser } = useAuth()

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword1, setNewPassword1] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);
  const [errorText, setErrorText] = useState();

  const updatePassword = async () => {
    if (newPassword1 !== newPassword2) {
      return setErrorText("Nowe hasła muszą się zgadzać.");
    }
    if (!oldPassword || !newPassword1 || !newPassword2) {
      return setErrorText("Uzupełnij wszystkie pola.");
    }

    if (!validatePassword(newPassword1)) {
      setErrorText(
        "Wpisz odpowiednie hasło. Musi mieć minimum 8 znaków, cyfrę i znak specjalny."
      );
      return;
    }

    const oldData = {
      password: oldPassword,
    };
    const response = await axios.post("/api/check-password", oldData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (response.data.auth) {
      const newData = {
        password: newPassword1,
      };
      await axios.put("/api/user", newData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUser(null);
      alert("Hasło zmienione, zaloguj się.");
    } else {
      return setErrorText("Podałeś błędne stare hasło");
    }
  };

  const validatePassword = (password) => {
    if (
      password.length >= 8 &&
      password.match(/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/) && //eslint-disable-line
      password.match(/\d/) //eslint-disable-line
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Popup
        show={errorText ? true : false}
        text={errorText}
        onHide={() => setErrorText(null)}
      />
      <div className="settings-div p-3 m-1">
        <h5>Zmień hasło</h5>
        <input
          className="text-input"
          type="password"
          placeholder="Wpisz obecne hasło"
          onChange={(e) => setOldPassword(e.target.value)}
        ></input>
        <input
          className="text-input"
          placeholder="Wpisz nowe hasło"
          onChange={(e) => setNewPassword1(e.target.value)}
        ></input>
        <input
          className="text-input"
          placeholder="Wpisz nowe hasło jeszcze raz"
          onChange={(e) => setNewPassword2(e.target.value)}
        ></input>
        <Button className="mt-2" onClick={updatePassword}>
          Zatwierdź
        </Button>
      </div>
    </>
  );
};
export default UpdatePasswordForm
