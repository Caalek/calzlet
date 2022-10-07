import React, { useState } from "react"

const UserContext = React.createContext(null)

export const UserProvider = ({ userData, children }) => {
  let [user, setUser] = useState(userData)
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}
export default UserContext