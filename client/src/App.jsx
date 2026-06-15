import {Routes,Route} from "react-router-dom";
import Home from "./pages/Auth/Home";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import Register from "./pages/Auth/Register";
import Firstpage from "./pages/Dashboard/Firstpage";
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
        <Route path="/firstpage" element={<Firstpage/>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
    </>
  );
}

export default App;
