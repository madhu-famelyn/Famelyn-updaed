import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainmoduleStudent from "./Pages/StudentsHero/studentmain";
import WorkingProfessinalsMain from "./Pages/WorkingProfessional/WorkingProfessionalMain";
import BooksSection from "./Pages/BooksSection/BooksSection";
import TestimonialsMain from "./Pages/Testimonials/Testimonials";
import Courses from "./Pages/Courses/Courses";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminLogin from "./Pages/AdminDashboard/AdminLogin";
import Mainmodule from "./Pages/main";
import BlogSection from "./Pages/BlogSection/BlogSection";
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
        <Route path="/courses" element={<Courses />} />
        <Route path="/testimonials" element={<TestimonialsMain />} />
        <Route path="/blogs" element={<BlogSection />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
