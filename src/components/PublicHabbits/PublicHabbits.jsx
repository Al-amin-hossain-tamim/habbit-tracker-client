import axios from "axios";
import React, { useEffect, useState } from "react";
import PublicHabit from "../PublicHabit/PublicHabit";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CATEGORIES = [
  "All",
  "Health",
  "Study",
  "Productivity",
  "Personal Growth",
  "Other",
];

const PublicHabbits = () => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/habbits");
        setHabits(Array.isArray(res.data) ? res.data : []);
        setFilteredHabits(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching public habits:", error);
        toast.error("Failed to load public habits");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // Filter + search logic
  useEffect(() => {
    let filtered = [...habits];

    if (categoryFilter !== "All") {
      const catLower = categoryFilter.toLowerCase();
      filtered = filtered.filter(
        (h) => String(h.category || "").trim().toLowerCase() === catLower
      );
    }

    if (searchTerm.trim() !== "") {
      const s = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(
        (h) =>
          String(h.title || "").toLowerCase().includes(s) ||
          String(h.description || "").toLowerCase().includes(s)
      );
    }

    setFilteredHabits(filtered);
  }, [searchTerm, categoryFilter, habits]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <title>HabitSpark/public-habit</title>
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        Browse Public Habits
      </h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <input
          type="text"
          placeholder="Search habits by title or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/2 focus:outline-none focus:border-indigo-500"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select select-bordered w-full md:w-1/4 focus:outline-none focus:border-indigo-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
      ) : filteredHabits.length === 0 ? (
        <p className="text-center text-gray-500">No habits found.</p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredHabits.map((habit) => (
            <motion.div
              key={habit._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <PublicHabit habit={habit} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PublicHabbits;
