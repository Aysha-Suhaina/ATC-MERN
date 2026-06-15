import { logHabit } from "../api/habitApi";

export default function HabitCard({ habit, refresh }) {
    const today = new Date().toISOString().split("T")[0];

  const alreadyLogged = habit.logs?.some(
    log => log.date === today
  );
  const handleClick = async (status) => {


    try {
      await logHabit(habit._id, status);
      refresh(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      marginBottom: "10px"
    }}>
      <h3>{habit.habitName}</h3>

      <button onClick={() => handleClick(true) }disabled={alreadyLogged}>
        Yes 
      </button>

      <button onClick={() => handleClick(false)}disabled={alreadyLogged}>
        No 
      </button>

      {alreadyLogged && (
        <p style={{ color: "gray" }}>
          Already logged for today
        </p>
      )}
    </div>
  );
}