import React from "react";
import { useLoaderData } from "react-router";

const HabbitDetails = () => {
  const habit = useLoaderData();
  const {
    _id,
    name,
    email,
    title,
    description,
    category,
    frequency,
    imageUrl,
    created_At,
  } = habit || {};

  const formatDate = (d) => {
    if (!d) return "";
    const parsed = new Date(d);
    if (isNaN(parsed)) return d;
    return parsed.toLocaleDateString();
  };

  return (
    <section className="py-12 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <div className="h-64 w-full bg-slate-100 overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                No image available
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 font-semibold rounded-full">
                  {category || "General"}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                  {frequency || "N/A"}
                </span>
                <span className="text-slate-500">
                  {formatDate(created_At) || ""}
                </span>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-6 text-justify">
              {description ||
                "No description provided for this habit. Please check again later."}
            </p>

            {/* Creator Info */}
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <img
                src={
                  imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt={name || "Creator"}
                className="w-14 h-14 rounded-full border object-cover object-top"
              />
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {name || "Unknown User"}
                </h3>
                <p className="text-sm text-slate-500">{email || "N/A"}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline btn-sm border-purple-500 text-purple-600 hover:bg-purple-100"
              >
                ← Back
              </button>

              <button className="btn btn-sm bg-purple-600 text-white border-none hover:bg-purple-700">
                Add to My Habits
              </button>

              <button className="btn btn-sm bg-gradient-to-r from-orange-400 to-pink-500 text-white border-none hover:opacity-90">
                Share Habit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HabbitDetails;
