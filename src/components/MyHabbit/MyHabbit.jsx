import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const MyHabbits = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState({}); // { [habitId]: boolean }

  // helper: today's date string YYYY-MM-DD (UTC)
  const todayStr = () => new Date().toISOString().split("T")[0];

  // compute streak locally if server doesn't return it
  const computeStreakLocal = (history = []) => {
    if (!Array.isArray(history) || history.length === 0) return 0;
    const set = new Set(history);
    let streak = 0;
    const cur = new Date();
    while (true) {
      const ymd = cur.toISOString().split("T")[0];
      if (set.has(ymd)) {
        streak++;
        cur.setUTCDate(cur.getUTCDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  // Fetch user's own habits
  useEffect(() => {
    if (!loginUser?.email) return;

    const fetchHabits = async () => {
      setLoading(true);
      try {
        const email = loginUser.email.trim().toLowerCase();
        const res = await axios.get("http://localhost:5000/my-habbits", {
          params: { email },
        });

        // Normalize data to an array and ensure fields exist
        const data = Array.isArray(res.data) ? res.data : res.data?.habits ?? [];
        const normalized = data.map((h) => ({
          ...h,
          completionHistory: Array.isArray(h.completionHistory) ? h.completionHistory : [],
          currentStreak: typeof h.currentStreak === "number" ? h.currentStreak : computeStreakLocal(h.completionHistory),
        }));

        setHabits(normalized);
      } catch (err) {
        console.error("Failed to load habits:", err);
        toast.error("Failed to load habits");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [loginUser?.email]);

  // Delete habit
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This habit will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#fff",
      backdrop: `rgba(0,0,0,0.4)`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/habbits/${id}`);
          toast.success("Habit deleted successfully");
          setHabits((prev) => prev.filter((h) => h._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your habit has been removed.",
            icon: "success",
            confirmButtonColor: "#9333ea",
          });
        } catch (err) {
          console.error("Delete failed:", err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the habit. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };

  // Mark Complete: calls backend endpoint and updates this habit
 const handleMarkComplete = async (id) => {
  if (!loginUser?.email) {
    toast.error("You must be logged in.");
    navigate("/Login");
    return;
  }

  const habit = habits.find((h) => h._id === id);
  if (!habit) return toast.error("Habit not found.");

  const today = new Date().toISOString().split("T")[0];

  // prevent duplicate
  if (habit.completionHistory?.includes(today)) {
    toast("Already completed today.");
    return;
  }

  setMarking((m) => ({ ...m, [id]: true }));

  try {
    // PATCH request to backend
    const res = await axios.patch(`http://localhost:5000/habbits/${id}`, {
      addDate: today, // tells backend to push today's date
    });

    if (!res.data.success) {
      toast.error("Failed to update.");
      return;
    }

    const updated = res.data.habit;

    toast.success("Marked as complete!");

    // Update UI instantly
    setHabits((prev) =>
      prev.map((h) =>
        h._id === id
          ? {
              ...updated,
              completionHistory: updated.completionHistory,
              currentStreak: updated.currentStreak,
            }
          : h
      )
    );
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong.");
  } finally {
    setMarking((m) => ({ ...m, [id]: false }));
  }
};


  // format date utility
  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    if (isNaN(date)) return d;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Habits</h1>

        <title>HabitSpark/my-habit</title>

        {habits.length === 0 ? (
          <div className="text-center text-slate-600 py-10">
            No habits found. Add your first habit now!
            <button
              onClick={() => navigate("/AddHabbit")}
              className="btn btn-sm ml-3 bg-indigo-600 text-white border-none hover:bg-indigo-700"
            >
              Add Habit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
            <table className="table w-full">
              <thead className="bg-indigo-100 text-indigo-700 font-semibold">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Current Streak</th>
                  <th>Created Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((h, i) => (
                  <tr key={h._id} className="hover:bg-indigo-50">
                    <td>{i + 1}</td>
                    <td className="font-semibold text-slate-800">{h.title}</td>
                    <td>{h.category}</td>
                    <td>
                      <span className="badge badge-outline badge-success">
                        {h.currentStreak ?? 0} days
                      </span>
                    </td>
                    <td>{formatDate(h.created_At)}</td>
                    <td className="flex flex-wrap gap-2 justify-center mt-2">
                      <Link
                        to={`/UpdateHabit/${h._id}`}
                        className="btn btn-xs bg-yellow-400 border-none text-white hover:bg-yellow-500"
                      >
                        Update
                      </Link>

                      <button
                        onClick={() => handleDelete(h._id)}
                        className="btn btn-xs bg-red-500 border-none text-white hover:bg-red-600"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleMarkComplete(h._id)}
                        className="btn btn-xs bg-green-500 border-none text-white hover:bg-green-600"
                        disabled={!!marking[h._id]}
                      >
                        {marking[h._id] ? "Marking..." : "Mark Complete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" />
    </section>
  );
};

export default MyHabbits;
