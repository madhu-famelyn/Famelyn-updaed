import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainmoduleStudent from "./Pages/StudentsHero/studentmain";
import WorkingProfessinalsMain from "./Pages/WorkingProfessional/WorkingProfessionalMain";
import BooksSection from "./Pages/BooksSection/BooksSection";
import Mainmodule from "./Pages/main";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default Home */}
        <Route path="/" element={<Mainmodule />} />

        {/* Emerging Leader Page */}
        <Route path="/emerging-leader" element={<MainmoduleStudent />} />
        <Route path="/professionals" element={<WorkingProfessinalsMain />} />
        <Route path="/books" element={<BooksSection />} />

      </Routes>
    </Router>
  );
}

export default App;