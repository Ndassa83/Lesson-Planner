import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navbar-container">
      <div
        className={`navbar-element ${
          location.pathname === "/" ? "active" : ""
        }`}
        onClick={() => navigate("/")}
      >
        1. Create Lesson Plan
      </div>
      <div
        className={`navbar-element ${
          location.pathname === "/LessonPlan" ? "active" : ""
        }`}
        onClick={() => {
          navigate("/LessonPlan");
        }}
      >
        2. Edit & Refine
      </div>
      <div
        className={`navbar-element ${
          location.pathname === "/DownloadPage" ? "active" : ""
        }`}
        onClick={() => navigate("/DownloadPage")}
      >
        3. Preview & Download
      </div>
    </div>
  );
};
