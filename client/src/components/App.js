import { Routes, Route } from "react-router-dom";
import CreateSetPage from "./CreateSetPage";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
// import "../scss/index.scss";
// import "../scss/custom.scss"
import ViewSet from "./ViewSet";
import FullScreenFlashcards from "./FullScreenFlashcards";
import YourSets from "./YourSets";
import { React } from "react";
import EditFullSetPage from "./EditFullSetPage";
import { UserProvider } from "../context/UserContext";
import ElaMode from "./ElaMode";
import LoginForm from "./LoginForm";
import SettingsPage from "./SettingsPage";
import VerifyEmail from "./VerifyEmail";

import AxiosInterceptor from "./AxiosInterceptor";
import RequireAuth from "./RequireAuth"

const App = () => {

  return (
    <UserProvider>
        <BrowserRouter>
         <AxiosInterceptor>
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
                  <SettingsPage />
                </RequireAuth>
              }
            />
            <Route path="/flashcards/:setId" element={<FullScreenFlashcards />} />
            <Route path="/ela-mode/:setId" element={<ElaMode />} />
            <Route path="/verify-email/:emailVerifyToken" element={<VerifyEmail />} />
          </Routes>
          </AxiosInterceptor>
        </BrowserRouter>
    </UserProvider>
  );
};

export default App;
