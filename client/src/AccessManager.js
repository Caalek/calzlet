import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

const AccessManager = (props) => {
  const [viewAccess, setViewAccess] = useState(props.viewAccess);
  const [editAccess, setEditAccess] = useState(props.editAccess);
  const [viewPassword, setViewPassword] = useState(props.viewPassword);
  const [editPassword, setEditPassword] = useState(props.editPassword);

  const handleSubmit = () => {
    props.setAccess(viewAccess, editAccess);
    if (editAccess === "all" || editAccess === "me") {
      setEditPassword("")
    }
    if (viewAccess === "all" || viewAccess === "me") {
      setViewPassword("")
    }
    props.setPasswords(viewPassword, editPassword)
    props.onHide();
  };
  return (
    <>
      <div className="popup">
        <Modal
          show={props.show}
          onHide={props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={false}
          className="popup"
        >
          <Modal.Body>
            <Row className="p-3">
              <Col sm={12} md={6}>
                <h4>Widoczne dla</h4>
                <select
                  defaultValue={props.viewAccess}
                  className="select-input"
                  onChange={(e) => setViewAccess(e.target.value)}
                  selected={props.viewAccess}
                >
                  <option value="all">każdego</option>
                  <option value="me">tylko mnie</option>
                  <option value="password">posiadających hasło</option>
                </select>
                {viewAccess === "password" && (
                  <input
                    type="password"
                    defaultValue={props.viewPassword}
                    className="text-input mt-3"
                    placeholder="Wpisz hasło do wyświetlania"
                    onChange={(e) => setViewPassword(e.target.value)}
                  ></input>
                )}
              </Col>
              <Col sm={12} md={6}>
                <h4>Możliwe do edycji dla</h4>
                <select
                  defaultValue={props.editAccess}
                  className="select-input"
                  onChange={(e) => setEditAccess(e.target.value)}
                  selected="tylko mnie"
                >
                  <option value="all">każdego</option>
                  <option value="me">tylko mnie</option>
                  <option value="password">posiadających hasło</option>
                </select>
                {editAccess === "password" && (
                  <input
                    defaultValue={props.editPassword}
                    type="password"
                    className="text-input mt-3"
                    placeholder="Wpisz hasło do edycji"
                    onChange={(e) => setEditPassword(e.target.value)}
                  ></input>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              disabled={
                (viewAccess === "password" && !viewPassword) ||
                (editAccess === "password" && !editPassword)
              }
              onClick={handleSubmit}
              size="lg"
              className="m-2"
            >
              Zapisz zmiany
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default AccessManager;
