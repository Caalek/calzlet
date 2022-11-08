import { useContext } from "react"
import UserContext from "../context/UserContext"
import defaultAvatarImage from "../img/default_avatar.png"

const Avatar = ({ size }) => {
    const { user } = useContext(UserContext)
    return (
        <>
        {user.user.avatarUrl ?
        <img height={size} width={size} src={user.user.avatarUrl}></img> :
        <img height={size} width={size} src={defaultAvatarImage}></img>
        }
        </>
    )
}
export default Avatar