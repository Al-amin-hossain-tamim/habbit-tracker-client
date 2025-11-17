import React, { useState, useContext } from "react";
import { useNavigate, useLoaderData } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";

const UpdateHabit = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const data = useLoaderData();
  const { _id, title, imageUrl, reminderTime, description, category, frequency } =
    data;

  console.log(data, _id);

  const [submitting, setSubmitting] = useState(false);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const newTitle = e.target.title.value;
    const newDescription = e.target.newDescription.value;
    const newCategory = e.target.newCategory.value;
    const newReminderTime = e.target.newReminderTime.value;
    const newImageUrl = e.target.newImageUrl.value;
    const newFrequency = e.target.newFrequency.value;
    try {
      const updateHabit = {
        title: newTitle,
        description: newDescription,
        category: newCategory,
        reminderTime: newReminderTime,
        frequency: newFrequency,
        imageUrl: newImageUrl,
        name: loginUser?.displayName,
        email: loginUser?.email,
      };

      await axios.patch(`http://localhost:5000/habbits/${_id}`, updateHabit);
      toast.success("Habit updated successfully!");
      navigate("/MyHabbit");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update habit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <title>HabitSpark/update-habit</title>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">
        Update Habit
      </h2>

      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        {/* Habit Title */}
        <div>
          <label className="label font-semibold">Habit Title</label>
          <input
            type="text"
            placeholder="Enter Habit Title"
            defaultValue={title}
            name="newTitle"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            placeholder="Write habit description"
            className="textarea textarea-bordered w-full"
            defaultValue={description}
            name="newDescription"
            rows="3"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="label font-semibold">Category</label>
          <select
            className="select select-bordered w-full"
            defaultValue={category}
            name="newCategory"
          >
            <option value="">Select</option>
            <option value="Health">Health</option>
            <option value="Study">Study</option>
            <option value="Productivity">Productivity</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium mb-2">Frequency</label>
          <select
            name="newFrequency"
            defaultValue={frequency}
            className="select select-bordered w-full"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {/* Reminder Time */}
        <div>
            <label className="block text-sm font-medium mb-2">
            Reminder Time
            </label>
            <input
              type="time"
              name="newReminderTime"
              defaultValue={reminderTime}
              className="input input-bordered w-full"
            />
          </div>

        {/* Image Upload */}
        <div>
          <label className="label font-semibold">Image Url</label>
          <input
            type="text"
            defaultValue={imageUrl}
            className="input input-bordered w-full"
            placeholder="yourimage@example.com"
            name="newImageUrl"
          />
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">User Name</label>
            <input
              type="text"
              value={loginUser?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label font-semibold">User Email</label>
            <input
              type="email"
              value={loginUser?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="btn bg-purple-600 text-white hover:bg-purple-700 border-none"
          >
            {submitting ? "Updating..." : "Update Habit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateHabit;
