import { Routes, Route } from "react-router-dom";
import CreateSet from "./CreateSet";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ViewSet from "./ViewSet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-set" element={<CreateSet />} />
        <Route path="/view-set" element={<ViewSet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
