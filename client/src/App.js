import { Routes, Route } from "react-router-dom";
import CreateSet from "./CreateSet";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ViewSet from "./ViewSet";
import FullScreenFlashcards from "./FullScreenFlashcards";
import YourSets from "./YourSets"
import { useEffect, React, useState } from "react";
import jwt_decode from "jwt-decode"
import UserContext from "./UserContext";

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  function handleLogin(response) {
    const user = jwt_decode(response.credential)
    setUser(user)
  }

  useEffect(() => {
    /* global google */
    const src = 'https://accounts.google.com/gsi/client'
    const id = "719943597842-6kbc1mcjr71uce42o5td9o0ll316521o.apps.googleusercontent.com"

    loadScript(src).then(() => {
      google.accounts.id.initialize({
        client_id: id,
        callback: handleLogin
      })

      google.accounts.id.renderButton(
        document.getElementById("googleSignIn"),
        { theme: "outline", size: "large"}
      );
      })
      .catch(console.err)
      
  }, [])

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))

  }, [user])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create-set" element={<CreateSet />} />
          <Route path="/view-set/:setId" element={<ViewSet />} />
          <Route path="/your-sets" element={<YourSets />} />
          <Route path="/flashcards/:setId" element={<FullScreenFlashcards />} />

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
