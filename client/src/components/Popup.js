import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function Popup(props) {
  return (
    <div className='popup'>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
        className="popup"
      >
        <Modal.Body>
          {props.text}
        </Modal.Body>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <Button className="m-2" onClick={props.onHide}>Ok</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Popup;