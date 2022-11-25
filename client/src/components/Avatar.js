import defaultAvatarImage from "../img/default_avatar.png";
import "../css/Avatar.css"

const Avatar = ({ user, size }) => {
  return (
    <>
      {user.avatarUrl === "default" ? (
        <img className="avatar" height={size} width={size} src={defaultAvatarImage} alt="avatar"></img>
      ) : (
        <img className="avatar" height={size} width={size} src={user.avatarUrl} alt="avatar"></img>
      )}
    </>
  );
};
export default Avatar;
