import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ConfirmDialogue from "./ConfirmDialogue";
import useAuth from "../hooks/useAuth";

const DeleteAccountForm = () => {
  const { user, setUser } = useAuth()
  const [showDialogue, setShowDialogue] = useState(false);

  const deleteUser = async () => {
    await axios.delete("/api/user", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setUser(null);
    alert("Twoje konto zostało usunięte.");
  };

  return (
    <>
      <ConfirmDialogue
        show={showDialogue}
        text={"Czy na pewno chcesz usunąć swoje konto? Nie będzie odwrotu."}
        onConfirm={deleteUser}
        onReject={() => setShowDialogue(false)}
      />
      <div className="settings-div p-3">
        <h5 style={{ color: "#ff725b" }}>Usuń konto</h5>
        <span className="font-background">
          Usunięcie konta spowoduje bezpowrotne usunięcie również wszystkich
          Twoich zestawów.
        </span>
        <br />
        <Button variant="danger" onClick={() => setShowDialogue(true)}>
          Rozumiem, chcę usunąć konto
        </Button>
      </div>
    </>
  );
};
export default DeleteAccountForm;
