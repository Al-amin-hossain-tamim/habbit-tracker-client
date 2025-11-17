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

  return (
    // make the card fill the grid cell height
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-5 flex flex-col h-full">
      {/* Image (fixed height so cards look consistent) */}
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

      {/* Info area grows to push buttons to bottom */}
      <div className="flex-1 flex flex-col">
        <div>
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

        {/* spacer pushes actions to bottom */}
        <div className="flex-1" />

        {/* Actions: using mt-auto is also ok; here spacer + this block keeps buttons bottom-aligned */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleViewDetails}
            className="btn btn-sm bg-purple-600 text-white border-none hover:bg-purple-700"
          >
            See Details
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
    </div>
  );
};

export default PublicHabit;
