import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import axios from "../utils/axios";

import useAuth from "../hooks/useAuth";
import Popup from "./Popup";

const UpdateEmailForm = () => {
  const { user, setUser } = useAuth();
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [errorText, setErrorText] = useState(null)

  const updateEmail = async () => {
    if (!email) {
      return setErrorText("Wpisz emial");
    }

    const isSpamEmail = await checkIfSpamEmail(email)

    if (isSpamEmail) {
      return setErrorText("Nie używaj tymczasowych maili :)");
    }
    const data = {
      password: password,
    };
    const response = await axios.post("/api/check-password", data, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    if (response.data.auth) {
      const data = {
        email: email,
      };
      const response = await axios.put("/api/user", data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.data.message !== "success") {
        return setErrorText("Użytkownik z tym adresem email już istnieje.");
      }
      setUser(null);
      alert("Adres email zmieniony, zaloguj się ponownie.");
    } else {
      setErrorText("Podaj poprawne hasło.");
    }
  };

  const checkIfSpamEmail = async (email) => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/unkn0w/disposable-email-domain-list/main/domains.json"
    );
    const spamList = response.data;
    for (let spamDomain of spamList) {
      if (email.split("@")[1] === spamDomain) {
        return true;
      }
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
        <h5>Zmień email</h5>
        <span className="font-background">
          Twój obecny email to {user.email}
        </span>
        <input
          className="text-input"
          placeholder="Wpisz nowy email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="text-input"
          placeholder="Wpisz swoje hasło"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <Button className="mt-2" onClick={updateEmail}>
          Zatwierdź
        </Button>
      </div>
    </>
  );
};
export default UpdateEmailForm;
