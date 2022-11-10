import { useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";

const VerifyEmailPrompt = () => {
  const { user } = useContext(UserContext);

  const style = {
    backgroundColor: "#2e3856",
    textAlign: "center",
    color: "white",
  };

  const resendVerificationLink = () => {
    axios
      .get("/api/send-email-verify", {headers: { Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        if (response.status === 200) {
          alert("Link wysłany");
        } else {
          alert("Wystąpił błąd");
        }
      });
  };

  return (
    <div style={style}>
      <span className="red">Email niezweryfikowany.</span> Kliknij link w
      wysłanym do ciebie emailu.
      <span onClick={resendVerificationLink} style={{ color: "#a8b1ff" }}>
        {" "}
        Wyślij link jeszcze raz{" "}
      </span>
    </div>
  );
};
export default VerifyEmailPrompt;
