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
import EmployeeList from "./pages/admin/EmployeeManagement/EmployeeList";
import CreateEmployee from "./pages/admin/EmployeeManagement/CreateEmployee";
import UpdateEmployee from "./pages/admin/EmployeeManagement/UpdateEmployee";
import AdminAttendanceMgmt from "./pages/admin/AttendanceManagement/AdminAttendanceMgmt";
import PendingAttendance from "./pages/admin/AttendanceManagement/PendingAttendance";
import DepartmentManagement from "./pages/admin/DepartmentManagement/DepartmentManagement";
import EditDepartment from "./pages/admin/DepartmentManagement/EditDepartment";
//import Profile from "./pages/Profile/Profile";
//import Profile from "./pages/Profile/Profile";
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
            <ProtectedRoute allowedRoles={["Admin"]}>
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

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAttendanceMgmt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pending-attendance"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PendingAttendance />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={["admin","manager","employee"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EmployeeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees/create"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees/edit/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UpdateEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={<DepartmentManagement />}
      />

      <Route
          path="/admin/departments/edit/:id"
          element={<EditDepartment />}
      />
        

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
    </>
  );
}

export default App;
