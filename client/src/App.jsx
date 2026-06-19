import {Routes,Route} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Auth/Home";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditAttendance from "./pages/Dashboard/EditAttendance";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ManagerDashboard from "./pages/Dashboard/ManagerDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/register" element={<Register/>} />
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee","admin","manager"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/edit/:id"
          element={<EditAttendance />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute allowedRoles={["manager","admin"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
    </>
  );
}

export default App;
