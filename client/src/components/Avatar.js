import defaultAvatarImage from "../img/default_avatar.png";
import styles from "./Avatar.module.css"

const Avatar = ({ user, size }) => {
  return (
    <>
      {user.avatarUrl === "default" ? (
        <img className={styles.avatar} height={size} width={size} src={defaultAvatarImage} alt="avatar"></img>
      ) : (
        <img className={styles.avatar} height={size} width={size} src={user.avatarUrl} alt="avatar"></img>
      )}
    </>
  );
};
export default Avatar;
