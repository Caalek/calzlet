import { Routes, Route, Navigate } from "react-router-dom";
import CreateSetPage from "./CreateSetPage";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import "../index.css";
import ViewSet from "./ViewSet";
import FullScreenFlashcards from "./FullScreenFlashcards";
import YourSets from "./YourSets";
import { useEffect, React, useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import UserContext, { UserProvider } from "../context/UserContext";
import EditFullSetPage from "./EditFullSetPage";
import ElaMode from "./ElaMode";
import LoginForm from "./LoginForm";
import Settings from "./Settings";

// const loadScript = (src) =>
//   new Promise((resolve, reject) => {
//     if (document.querySelector(`script[src="${src}"]`)) return resolve()
//     const script = document.createElement('script')
//     script.src = src
//     script.onload = () => resolve()
//     script.onerror = (err) => reject(err)
//     document.body.appendChild(script)
//   })

const RequireAuth = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  if (user) {
    if (Date.now() >= user.token.exp * 1000) { //check if token expired
      setUser(null)
      return <Navigate to="/login" />
    }
    return children
  } else {
    return <Navigate to="/login" />
  }
};

const App = () => {
  let userItem = localStorage.getItem("user");
  const user = JSON.parse(userItem);

  // function handleLogin(response) {
  //   const user = jwt_decode(response.credential)
  //   setUser(user)
  // }

  // useEffect(() => {
  //   /* global google */
  //   const src = 'https://accounts.google.com/gsi/client'
  //   const id = "719943597842-6kbc1mcjr71uce42o5td9o0ll316521o.apps.googleusercontent.com"

  //   loadScript(src).then(() => {
  //     google.accounts.id.initialize({
  //       client_id: id,
  //       callback: handleLogin
  //     })

  //     google.accounts.id.renderButton(
  //       document.getElementById("googleSignIn"),
  //       { theme: "outline", size: "large"}
  //     );
  //     })
  //     .catch(console.err)

  // }, [])

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user))

  // }, [user])

  return (
    <UserProvider userData={user}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />}></Route>
          <Route
            path="/create-set"
            element={
              <RequireAuth>
                <CreateSetPage />
              </RequireAuth>
            }
          />
          <Route path="/view-set/:setId" element={<ViewSet />} />
          <Route
            path="/edit-set/:setId"
            element={
              <RequireAuth>
                <EditFullSetPage />
              </RequireAuth>
            }
          />
          <Route
            path="/your-sets"
            element={
              <RequireAuth>
                <YourSets />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route path="/flashcards/:setId" element={<FullScreenFlashcards />} />
          <Route path="/ela-mode/:setId" element={<ElaMode />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
