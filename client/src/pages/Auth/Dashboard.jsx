import Navbar from "../../components/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div>
      <Navbar/>

      <h1>Welcome {user.name}</h1>

      <div className="card">
        <h3>Courses</h3>
        <p>Java, Web Dev</p>
      </div>

      <div className="card">
        <h3>Assignments</h3>
        <p>2 pending</p>
      </div>

      <div className="card">
        <h3>Attendance</h3>
        <p>85%</p>
      </div>
    </div>
  );
}

export default Dashboard;
