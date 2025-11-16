
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const PublicHabit = ({ habit }) => {
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

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const truncate = (s, n = 120) => (s && s.length > n ? s.slice(0, n) + "…" : s || "");
  const formatDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString();
  };

  const handleViewDetails = () => {
    if (!loginUser) {
      toast.error("Please login to view habit details");
      navigate("/Login");
      return;
    }
    navigate(`/HabbitDetails/${_id}`);
  };

  const handleQuickView = () => {
    
    navigate(`/HabbitDetails/${_id}`);
  };

  return (
    <article className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Hero image */}
      <div className="rounded-xl overflow-hidden mb-5">
        <img
          src={imageUrl || "https://via.placeholder.com/800x450?text=No+Image"}
          alt={title}
          className="w-full h-44 object-cover rounded-xl"
        />
      </div>

      {/* Title + description + tags + date */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 pr-4">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight">
            {title}
          </h3>

          <p className="text-slate-600 mb-4">{truncate(description, 110)}</p>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-semibold">
              {category || "General"}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
              {frequency || "N/A"}
            </span>
          </div>
        </div>

        <div className="text-slate-400 text-sm whitespace-nowrap">
          {formatDate(created_At)}
        </div>
      </div>

      {/* Creator */}
      <div className="flex items-center gap-3 mt-6">
        <img
          src={imageUrl || "/default-avatar.png"}
          alt={name || "Creator"}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <div className="text-sm font-semibold text-slate-800">{name || "Unknown"}</div>
          <div className="text-xs text-slate-500">{email || ""}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleViewDetails}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#9b22ff] to-[#7c3aed] text-white font-semibold shadow hover:opacity-95"
        >
          View Details
        </button>

        <button
          onClick={handleQuickView}
          className="text-slate-600 hover:text-purple-600"
        >
          Quick View
        </button>
      </div>
    </article>
  );
};

export default PublicHabit;
