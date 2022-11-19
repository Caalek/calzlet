import Button from "react-bootstrap/Button";
import "../css/BlueButton.css"

const BlueButton = ({ iconSrc, text, onClick }) => {
  return (
    <Button onClick={onClick} className="m-2">
      <img className="button-icon" src={iconSrc} height={17} />
      {text}
    </Button>
  );
};
export default BlueButton
