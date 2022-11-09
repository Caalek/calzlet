import defaultAvatarImage from "../img/default_avatar.png";

const Avatar = ({ user, size }) => {
  return (
    <>
      {user.avatarUrl === "default" ? (
        <img className="avatar" height={size} width={size} src={defaultAvatarImage}></img>
      ) : (
        <img className="avatar" height={size} width={size} src={user.avatarUrl}></img>
      )}
    </>
  );
};
export default Avatar;
