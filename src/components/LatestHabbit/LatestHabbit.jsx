import React, { useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const LatestHabbit = ({ latestHabbit }) => {
  const { _id, name, email, title, description, category, frequency, imageUrl, created_At } =
    latestHabbit || {};

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (!loginUser) {
      toast.error("Please login to view habit details.");
      navigate("/Login");
      return;
    }
    navigate(`/HabbitDetails/${_id}`);
  };

  const truncate = (text, n = 120) =>
    text && text.length > n ? text.slice(0, n) + "…" : text;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString();
  };

  return (
    <div
      className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-5 flex flex-col hover:-translate-y-1"
    >
      {/* Image */}
      <div className="h-40 w-full mb-4 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="text-slate-400">No image</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600 mb-3">{truncate(description, 120)}</p>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="px-2 py-1 rounded-full bg-purple-50 text-purple-600">
            {category || "General"}
          </span>
          <span className="px-2 py-1 rounded-full bg-slate-100">
            {frequency || ""}
          </span>
          <span className="ml-auto text-slate-400">{formatDate(created_At)}</span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <img
            src={imageUrl || "/default-avatar.png"}
            alt={name || "Creator"}
            className="w-9 h-9 rounded-full object-cover border"
          />
          <div>
            <div className="text-sm font-medium text-slate-800">
              {name || "Unknown"}
            </div>
            <div className="text-xs text-slate-500">{email || ""}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleViewDetails}
          className="btn btn-sm bg-purple-600 text-white border-none hover:bg-purple-700"
        >
          View Details
        </button>

        <button
          onClick={() => {
            if (!loginUser) {
              toast.error("Login required to view details.");
              navigate("/Login");
              return;
            }
            navigate(`/HabbitDetails/${_id}`);
          }}
          className="btn btn-ghost btn-sm text-slate-600 hover:text-purple-600"
        >
          Quick View
        </button>
      </div>
    </div>
  );
};

export default LatestHabbit;
