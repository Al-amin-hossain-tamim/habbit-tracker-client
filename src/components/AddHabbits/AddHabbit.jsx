import React, { use } from "react";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const AddHabbit = () => {
  const { loginUser } = use(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const frequency = e.target.frequency.value;
    const imageUrl = e.target.imageUrl.value;
    const reminderTime = e.target.reminderTime.value;

    const newHabit = {
      name,
      email,
      title,
      description,
      category,
      frequency,
      imageUrl,
      reminderTime,
    };

    await axios.post(
      "https://habbit-tracker-api-server.vercel.app/habbits",
      newHabit
    );

    e.target.reset();
    toast.success("Habit added successfully");
  };

  return (
    <div className="py-10 px-4">
      <title>HabitSpark/Add-habit</title>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Add a New Habit</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* name & email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your name
              </label>
              <input
                name="name"
                defaultValue={`${loginUser.displayName}`}
                className="input input-bordered w-full"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                name="email"
                type="email"
                defaultValue={`${loginUser?.email}`}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
          </div>

          {/* title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <span className="text-red-600">*</span> Habit Title
            </label>
            <input
              name="title"
              className="input input-bordered w-full"
              placeholder="e.g., Morning Walk"
              required
            />
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <span className="text-red-600">*</span> Description
            </label>
            <textarea
              name="description"
              rows="3"
              className="textarea textarea-bordered w-full"
              placeholder="Short description of the habit"
              required
            />
          </div>

          {/* meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-500">*</span> Category
              </label>
              <select
                name="category"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select</option>
                <option value="Health">Health</option>
                <option value="Study">Study</option>
                <option value="Productivity">Productivity</option>
                <option value="Personal Growth">Personal Growth</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-600">*</span> Frequency
              </label>
              <select
                name="frequency"
                required
                className="select select-bordered w-full"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/*  Reminder Time */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className="text-red-600">*</span> Reminder Time
              </label>
              <input
                type="time"
                name="reminderTime"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Habit Image (optional)
            </label>
            <input
              name="imageUrl"
              className="input input-bordered w-full"
              placeholder="Image URL"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn bg-indigo-600 text-white border-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddHabbit;
