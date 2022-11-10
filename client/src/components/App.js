import { Routes, Route, Navigate } from "react-router-dom";
import CreateSetPage from "./CreateSetPage";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import "../scss/index.scss";
import "../scss/custom.scss"
import ViewSet from "./ViewSet";
import FullScreenFlashcards from "./FullScreenFlashcards";
import YourSets from "./YourSets";
import { React, useContext } from "react";
import UserContext, { UserProvider } from "../context/UserContext";
import EditFullSetPage from "./EditFullSetPage";
import ElaMode from "./ElaMode";
import LoginForm from "./LoginForm";
import Settings from "./Settings";
import { isExpired } from "react-jwt";
import VerifyEmail from "./VerifyEmail";

const RequireAuth = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  if (user) {
    // ten undefined tu bo jakiś dziwny błąd był
    if (isExpired(user.token) && user.token !== undefined) { //check if token expired
      setUser(null)
      console.log("shit")
      localStorage.clear()
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
          <Route path="/verify-email/:emailVerifyToken" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
