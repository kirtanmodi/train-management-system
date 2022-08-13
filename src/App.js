import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SeatAssignment from "./pages/SeatAssignment";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={""} element={<Home />} />
        <Route path={"seat-assignment"} element={<SeatAssignment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
