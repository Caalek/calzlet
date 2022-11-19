import "../css/IconButton.css"

const IconButton = ({ iconSrc, onClick }) => {
  return (
    <div className="icon-button m-1 p-3" onClick={onClick}>
      <img src={iconSrc} height="18" alt="strzałka w lewo"></img>
    </div>
  );
};
export default IconButton
