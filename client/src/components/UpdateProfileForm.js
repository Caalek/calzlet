import Button from "react-bootstrap/Button";
import { useState, useContext, useRef } from "react";
import axios from "axios";

import Popup from "./Popup";
import Avatar from "./Avatar";
import useAuth from "../hooks/useAuth";

const UpdateProfileForm = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [newUsername, setNewUsername] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const filePicker = useRef();
  const { user, setUser } = useAuth()

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
    const result = await axios.post("/api/image", formData, {
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
    if (user.user.avatarUrl !== "default") {
      const avatarFilename = user.user.avatarUrl.split("/")[2];
      await axios.delete(`/api/image/${avatarFilename}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
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
    </>
  );
};
export default UpdateProfileForm
