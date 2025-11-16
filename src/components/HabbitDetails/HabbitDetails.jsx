import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router";

const HabitDetails = () => {
  const loadedHabit = useLoaderData();
  const [habit, setHabit] = useState(loadedHabit);

  const {
    _id,
    name,
    email,
    title,
    description,
    category,
    imageUrl,
    completionHistory = [],
  } = habit || {};

  // Today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // Calculate streak
  const calculateStreak = () => {
    const sorted = [...completionHistory].sort().reverse();
    let streak = 0;

    for (let i = 0; i < sorted.length; i++) {
      const day = new Date(sorted[i]);
      const diff = (new Date(today) - day) / (1000 * 60 * 60 * 24);

      if (diff === i) streak++;
      else break;
    }
    return streak;
  };

  const streak = calculateStreak();

  // Last 30 days progress
  const calculateProgress = () => {
    const last30 = completionHistory.filter((d) => {
      const diff = (new Date(today) - new Date(d)) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff < 30;
    });
    return Math.round((last30.length / 30) * 100);
  };

  const progress = calculateProgress();

  // Handle Mark Complete
  const handleMarkComplete = async () => {
    if (completionHistory.includes(today)) {
      return alert("Already marked complete for today!");
    }

    const updatedHistory = [...completionHistory, today];

    // Update UI instantly
    setHabit((prev) => ({
      ...prev,
      completionHistory: updatedHistory,
    }));

    // Update DB
    try {
      await axios.put(`http://localhost:5000/habbits/${_id}`, {
        completionHistory: updatedHistory,
      });
    } catch (error) {
      console.error("Failed to update habit", error);
      alert("Failed to update. Try again.");
    }
  };

  return (
    <section className="py-12 bg-slate-100 min-h-screen">
      <title>HabitSpark / Habit Details</title>

      <div className="max-w-4xl mx-auto px-4">

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
          {/* Image */}
          <div className="h-64 bg-slate-200">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">
                No Image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

            <span className="inline-block mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {category}
            </span>

            <p className="mt-4 text-slate-700 leading-relaxed">{description}</p>

            {/* Progress Bar */}
            <div className="mt-8">
              <p className="font-semibold text-slate-800 mb-2">
                Progress (Last 30 Days): {progress}%
              </p>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Streak Badge */}
            <div className="mt-6">
              <span className="px-4 py-2 bg-yellow-100 text-yellow-700 font-semibold rounded-xl">
                🔥 Current Streak: {streak} days
              </span>
            </div>

            {/* Creator info */}
            <div className="flex items-center gap-4 mt-8 border-t pt-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                alt="creator"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-slate-500">{email}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline border-indigo-500 text-indigo-600"
              >
                ← Back
              </button>

              <button
                onClick={handleMarkComplete}
                className="btn bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Mark Complete
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HabitDetails;
