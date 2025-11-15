import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import book from "../../assets/book.jpg"

const StartYourStreak = () => {
  return (
    <section className="py-20 bg-gradient-to-r mt-10 from-purple-100 via-purple-200 to-blue-100">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Left Text Section */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Start Your <span className="text-purple-600">Habit Streak</span> Today!
          </h2>
          <p className="text-slate-700 text-lg mb-6">
            Every great change starts with one small habit. Join HabitSpark and
            take the first step toward a better version of yourself.
          </p>

          <Link
            to="/AddHabbit"
            className="btn bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold border-none px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={book}
            alt="Habit tracking illustration"
            className="w-80 md:w-[400px] drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default StartYourStreak;
