import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";

const MyHabbits = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user's own habits
  useEffect(() => {
    if (!loginUser?.email) return;

    const fetchHabits = async () => {
      setLoading(true);
      try {
        const email = loginUser.email.trim().toLowerCase();
        console.log("Fetching my habbits for email:", email);

        const res = await axios.get("http://localhost:5000/my-habbits", {
          params: { email },
        });

        setHabits(res.data);
      } catch (err) {
        console.error("Failed to load habits:", err);
        toast.error("Failed to load habits");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [loginUser?.email]);

  // ✅ Delete habit (with SweetAlert2)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This habit will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea", // Tailwind purple-600
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#fff",
      backdrop: `
        rgba(0,0,0,0.4)
      `,
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

  // ✅ Mark Complete
  const handleMarkComplete = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/habbits/complete/${id}`, {
        email: loginUser?.email,
      });
      toast.success("Marked as complete!");
      setHabits((prev) =>
        prev.map((h) =>
          h._id === id ? { ...h, currentStreak: res.data.currentStreak } : h
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Could not mark complete");
    }
  };

  // ✅ Format date
  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    if (isNaN(date)) return d;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-purple-600"></span>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Habits</h1>

        {habits.length === 0 ? (
          <div className="text-center text-slate-600 py-10">
            No habits found. Add your first habit now!
            <button
              onClick={() => navigate("/AddHabbit")}
              className="btn btn-sm ml-3 bg-purple-600 text-white border-none hover:bg-purple-700"
            >
              Add Habit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
            <table className="table w-full">
              <thead className="bg-purple-100 text-purple-700 font-semibold">
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
                  <tr key={h._id} className="hover:bg-purple-50">
                    <td>{i + 1}</td>
                    <td className="font-semibold text-slate-800">{h.title}</td>
                    <td>{h.category}</td>
                    <td>
                      <span className="badge badge-outline badge-success">
                        {h.currentStreak || 0} days
                      </span>
                    </td>
                    <td>{formatDate(h.created_At)}</td>
                    <td className="flex flex-wrap gap-2 justify-center mt-2">
                      <button
                        onClick={() => navigate(`/update-habbit/${h._id}`)}
                        className="btn btn-xs bg-yellow-400 border-none text-white hover:bg-yellow-500"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(h._id)}
                        className="btn btn-xs bg-red-500 border-none text-white hover:bg-red-600"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleMarkComplete(h._id)}
                        className="btn btn-xs bg-green-500 border-none text-white hover:bg-green-600"
                      >
                        Mark Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyHabbits;
