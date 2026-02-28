import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pessoas from "./pages/Pessoas";
import Conhecimentos from "./pages/Conhecimentos";
import PaginaInicial from "./pages/PaginaInicial";
import SobreNos from "./pages/SobreNos";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/"            element={<PaginaInicial />} />
          <Route path="/pessoas"     element={<Pessoas />} />
          <Route path="/conhecimentos" element={<Conhecimentos />} />
          <Route path="/sobre"       element={<SobreNos />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;