import axios from "axios";
import React, { useEffect,useState} from "react";
import PublicHabit from "../PublicHabit/PublicHabit";
import toast from "react-hot-toast";


const PublicHabbits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await axios.get("http://localhost:5000/habbits");
        setHabits(res.data);
      } catch (error) {
        console.error("Error fetching public habits:", error);
        toast.error("Failed to load public habits");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

 

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Public Habits
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading public habits...</p>
      ) : habits.length === 0 ? (
        <p className="text-center text-gray-500">No public habits found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => <PublicHabit habit={habit} key={habit._id}></PublicHabit>)}
        </div>
      )}
    </div>
  );
};

export default PublicHabbits;
