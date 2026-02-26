import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pessoas from "./pages/Pessoas";
import Conhecimentos from "./pages/Conhecimentos";
import Landing from "./pages/Landing";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pessoas" element={<Pessoas />} />
          <Route path="/conhecimentos" element={<Conhecimentos />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;