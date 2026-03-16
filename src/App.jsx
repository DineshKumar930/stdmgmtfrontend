import "./App.css";
import AddStudent from "./pages/AddStudent";
import AdminLogin from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import EditStudent from "./pages/EditStudent";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import React from "react";
import StudentList from "./pages/StudentList";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAdminLoggedIn ? children : <Navigate to="/" replace />;
};

// Public Route (Login page ke liye)
const PublicRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAdminLoggedIn ? <Navigate to="/home" replace /> : children;
};

// Layout Controller
const AppLayout = () => {
  const location = useLocation();
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  // Login page par Navbar & Footer hide
  const hideLayout = location.pathname === "/" && !isAdminLoggedIn;

  return (
    <div className="app">
      {!hideLayout && isAdminLoggedIn && <Navbar />}

      <main className="main-content">
        <Routes>
          {/* Default Route = Login */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          {/* Protected Dashboard */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Protected Student List */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <StudentList />
              </ProtectedRoute>
            }
          />
           <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword/>
              </ProtectedRoute>
            }
          />

          {/* Protected Add Student */}
          <Route
            path="/add-student"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />

          {/* Protected Edit Student */}
          <Route
            path="/edit-student/:id"
            element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            }
          />

          {/* Any unknown route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideLayout && isAdminLoggedIn && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;