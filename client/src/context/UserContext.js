import { createContext, useEffect, useState } from "react"

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext