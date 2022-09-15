import { Routes, Route } from "react-router-dom";
import CreateSet from "./CreateSet";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ViewSet from "./ViewSet";
import FullScreenFlashcards from "./FullScreenFlashcards";
import MainNavbar from "./MainNavbar";
import YourSets from "./YourSets"
// flashcards - learn on fullscreen

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-set" element={<CreateSet />} />
        <Route path="/view-set" element={<ViewSet />} />
        <Route path="/your-sets" element={<YourSets />} />
        <Route path="/flashcards" element={<FullScreenFlashcards />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
