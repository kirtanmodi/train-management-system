import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SeatAssignment from "./pages/SeatAssignment";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"seat-assignment"} element={<SeatAssignment />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
