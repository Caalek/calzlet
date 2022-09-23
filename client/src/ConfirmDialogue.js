import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ConfirmDialogue = ({show, text, onConfirm, onReject}) => {
  return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
        className="popup"
      >
        <Modal.Body>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onReject}>Nie</Button>
          <Button onClick={onConfirm}>Tak</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ConfirmDialogue;