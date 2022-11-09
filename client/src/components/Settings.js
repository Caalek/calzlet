import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import MainNavbar from "./MainNavbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ConfirmDialogue from "./ConfirmDialogue";
import Popup from "./Popup";
import axios from "axios";
import Avatar from "./Avatar";
import { useRef } from "react";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [passwordForEmailChange, setPasswordForEmailChange] = useState();
  const [newEmail, setNewEmail] = useState();
  const [errorText, setErrorText] = useState();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword1, setNewPassword1] = useState();
  const [newPassword2, setNewPassword2] = useState();

  const [showDialogue, setShowDialogue] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [newUsername, setNewUsername] = useState(null);

  const filePicker = useRef();

  const updateEmail = async () => {
    if (!newEmail) {
      return setErrorText("Wpisz emial");
    }

    if (await checkIfSpamEmail(newEmail)) {
      return setErrorText("Nie używaj tymczasowych maili :)");
    }
    const data = {
      password: passwordForEmailChange,
    };

    const response = await axios.post("/api/check-password", data, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (response.data.auth) {
      const newData = {
        email: newEmail,
      };
      const response = await axios.put("/api/user", newData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.data.message !== "success") {
        setErrorText("Użytkownik z tym adresem email już istnieje.");
        return;
      }
      setUser(null);
      alert("Adres email zmieniony, zaloguj się ponownie.");
    } else {
      setErrorText("Podaj poprawne hasło.");
    }
  };

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

  const deleteUser = async () => {
    await axios.delete("/api/user", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setUser(null);
    alert("Twoje konto zostało usunięte.");
  };

  const uploadAvatar = async (image) => {
    if (image.size >= 3000000) {
      setErrorText("Za duży obraz. Maksymalny rozmiar to 3MB.");
      return;
    }

    if (!image.type.startsWith("image")) {
      setErrorText("Wstaw obraz, nie co innego.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    const result = await axios.post("/api/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });
    setAvatarUrl("/" + result.data.imageUrl);
  };

  const saveAvatar = async () => {
    const data = { avatarUrl: avatarUrl };
    await axios.patch("/api/user", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const copyUser = user;
    copyUser.user.avatarUrl = avatarUrl;
    setUser(copyUser);
    localStorage.setItem("user", JSON.stringify(copyUser));
    alert("Avatar zapisany");
  };

  const updateUsername = async () => {
    const data = { username: newUsername };
    await axios.patch("/api/user", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const copyUser = user;
    copyUser.username = newUsername;
    setUser(copyUser);
    localStorage.setItem("user", JSON.stringify(copyUser));
    alert("Nazwa użytkownika zmieniona");
  };

  return (
    <>
      <Popup
        show={errorText ? true : false}
        text={errorText}
        onHide={() => setErrorText(null)}
      />
      <ConfirmDialogue
        show={showDialogue}
        text={"Czy na pewno chcesz usunąć swoje konto? Nie będzie odwrotu."}
        onConfirm={deleteUser}
        onReject={() => setShowDialogue(false)}
      />
      <MainNavbar />
      <Container className="mt-5">
        <Row>
          <h3>{user.user.username}</h3>
          <Col sm={12} md={4}>
            <div className="settings-div p-3 m-1">
              <h5>Profil</h5>
              <span className="font-background">Nazwa użytkownika:</span>
              <input
                className="text-input"
                placeholder="Wpisz nazwę użytkownika"
                onChange={(e) => setNewUsername(e.target.value)}
                defaultValue={user.user.username}
              ></input>
              <Button className="mb-2" onClick={updateUsername}>
                Zmień nazwę użytkownika
              </Button>
              <span className="font-background">
                Kliknij na avatar, aby wybrać nowy.
              </span>
              <input
                ref={filePicker}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => uploadAvatar(e.target.files[0])}
              ></input>
              <div className="mt-2" onClick={() => filePicker.current.click()}>
                {!avatarUrl && <Avatar user={user.user} size={100} />}
                {avatarUrl && (
                  <img src={avatarUrl} height="100" width="100" alt="avatar"></img>
                )}
              </div>
              <br></br>
              <Button className="mt-2" onClick={saveAvatar}>
                Zapisz avatar
              </Button>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="settings-div p-3 m-1">
              <h5>Zmień email</h5>
              <span className="font-background">
                Twój obecny email to {user.user.email}
              </span>
              <input
                className="text-input"
                placeholder="Wpisz nowy email"
                onChange={(e) => setNewEmail(e.target.value)}
              ></input>
              <input
                className="text-input"
                placeholder="Wpisz swoje hasło"
                onChange={(e) => setPasswordForEmailChange(e.target.value)}
              ></input>
              <Button className="mt-2" onClick={updateEmail}>
                Zatwierdź
              </Button>
            </div>
          </Col>
          <Col sm={12} md={4}>
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
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={12} md={6}>
            <div className="settings-div p-3">
              <h5 style={{ color: "#ff725b" }}>Usuń konto</h5>
              <span className="font-background">
                Usunięcie konta spowoduje bezpowrotne usunięcie również
                wszystkich Twoich zestawów.
              </span>
              <br />
              <Button variant="danger" onClick={() => setShowDialogue(true)}>
                Rozumiem, chcę usunąć konto
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Settings;
