import {Routes,Route} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

//auth
import Home from "./pages/Auth/Home";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import Register from "./pages/Auth/Register";

//dashboard - attendance mgmt
import Dashboard from "./pages/employee/Dashboard";
import EditAttendance from "./pages/employee/EditAttendance";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeList from "./pages/admin/EmployeeManagement/EmployeeList";
import CreateEmployee from "./pages/admin/EmployeeManagement/CreateEmployee";
import UpdateEmployee from "./pages/admin/EmployeeManagement/UpdateEmployee";
import AdminAttendanceMgmt from "./pages/admin/AttendanceManagement/AdminAttendanceMgmt";
import PendingAttendance from "./pages/admin/AttendanceManagement/PendingAttendance";

//dept
import DepartmentManagement from "./pages/admin/DepartmentManagement/DepartmentManagement";
import EditDepartment from "./pages/admin/DepartmentManagement/EditDepartment";

//designation
import DesignationManagement from "./pages/admin/DesignationManagement/DesignationManagement"
import EditDesignation from "./pages/admin/DesignationManagement/EditDesignation";

//manager dahsbaird 
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import AttendanceApproval from "./pages/manager/AttendanceApproval";
import MyEmployees from "./pages/manager/MyEmployees";
import AttendanceHistory from "./pages/manager/AttedanceHistory";

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
          path="/manager/attendance"
          element={<AttendanceApproval />}
        />

        <Route 
          path="manager/my-employees"
          element={<MyEmployees/>}
          />
        <Route
  path="/manager/history"
  element={<AttendanceHistory />}
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

      <Route
          path="/admin/designations"
          element={<DesignationManagement />}
      />

      <Route
          path="/admin/designations/edit/:id"
          element={<EditDesignation />}
      />
        

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
    </>
  );
}

export default App;
