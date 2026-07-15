import {Routes,Route} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import socket from "./socket/socket";
import {useEffect} from 'react';

import AdminLayout from "./layouts/AdminLayout";
import Reports from "./pages/admin/Reports";
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
import ManagerDepartment from "./pages/manager/ManagerDepartment";
import ManagerDesignation from "./pages/manager/ManagerDesignation";

import Chat from "./pages/chat/Chat";
//import Profile from "./pages/Profile/Profile";
//import Profile from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(){

  useEffect(() => {
  const userId = localStorage.getItem("userId");

  if (!userId) return;

  const handleConnect = () => {
    console.log("Connected:", socket.id);

    socket.emit("register_user", userId);
  };

  socket.on("connect", handleConnect);

  socket.connect();

  // If already connected, register immediately.
  if (socket.connected) {
    handleConnect();
  }

  console.log("Socket Connected");
console.log("Socket ID:", socket.id);
console.log("User ID:", userId);
console.log("Connected:", socket.connected);

  return () => {
    socket.off("connect", handleConnect);
  };
}, []);
useEffect(() => {
  const userId = localStorage.getItem("userId");

  if (!userId) return;

  console.log("App mounted");

  const handleConnect = () => {
    console.log("CONNECTED EVENT");
    console.log(socket.id);

    socket.emit("register_user", userId);
  };

  socket.on("connect", handleConnect);

  console.log("Calling connect...");
  socket.connect();

  return () => {
    socket.off("connect", handleConnect);
  };
}, []);

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

        {/* admin routes  */}
        <Route
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route
  path="/admin/reports"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Reports />
    </ProtectedRoute>
  }
/>

  <Route
    path="/admin-dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="/admin/attendance"
    element={<AdminAttendanceMgmt />}
  />

  <Route
    path="/admin/pending-attendance"
    element={<PendingAttendance />}
  />

  <Route
    path="/admin/employees"
    element={<EmployeeList />}
  />

  <Route
    path="/admin/employees/create"
    element={<CreateEmployee />}
  />

  <Route
    path="/admin/employees/edit/:id"
    element={<UpdateEmployee />}
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

</Route>

        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute allowedRoles={["manager","admin"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
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
  path="/manager/my-department"
  element={
    <ProtectedRoute allowedRoles={["manager"]}>
      <ManagerDepartment />
    </ProtectedRoute>
  }
/>

<Route
  path="/manager/designations"
  element={
    <ProtectedRoute
      allowedRoles={["manager"]}
    >
      <ManagerDesignation />
    </ProtectedRoute>
  }
/>
        

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
    </>
  );
}

export default App;
