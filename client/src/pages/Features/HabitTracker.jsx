import React from "react";
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import {createHabit,getHabits } from "../../api/habitApi.js";//, logHabits
import HabitCard from "../../components/HabitCard.jsx";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  //const navigate = useNavigate();
  
  const fetchHabits = async () => {
    try {
      console.log(localStorage.getItem("userId"));
      const userId = localStorage.getItem("userId");
      const res = await getHabits(userId);
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleCreate = async () =>{
    try{
      const userId = localStorage.getItem("userId");
      await createHabit({ habitName, userId });
      setHabitName("");
      fetchHabits();
    }catch(err){
      console.error(err);
    }
  }

  //has to create a function to handle completed or not log 

  return(
      <div style={{ padding: "20px" }}>
        <h1>Habit Tracker</h1>
        <div style={{ marginBottom: "20px" }}>
          <input 
            type="text" 
            placeholder="New Habit Name" 
            value={habitName} 
            onChange={(e) => setHabitName(e.target.value)} 
          />
          <button onClick={handleCreate}>Add Habit</button>
        </div> 

        <div>
          {habits.map(habit => (
            <HabitCard key={habit._id} habit={habit} refresh={fetchHabits} />
          ))}
        </div>
        </div>
      
        
  );


  // habit log - same for good and bad
  //separate workflow of good and bad habits.

}