import React from "react";
import { Link } from "react-router";
import logo from "../../assets/habbit_logo.jpeg";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-slate-700 border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10">

        {/* TOP SECTION */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Column 1 — Logo (larger) */}
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <img className="w-12 h-12 rounded-full object-cover" src={logo} alt="HabitSpark Logo" />
              <h2 className="text-xl font-bold text-slate-900">
                Habit<span className="text-indigo-600">Spark</span>
              </h2>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Build better habits with HabitSpark — track progress, stay motivated, and grow every day.
            </p>
          </div>

          {/* Columns 2–4 in perfect equal spacing */}
          <div className="md:col-span-3 grid md:grid-cols-3 gap-10">

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-3 text-slate-900">Contact</h3>
              <ul className="text-sm space-y-1 font-medium">
                <li>
                  Email:{" "}
                  <a href="mailto:support@habitspark.com" className="hover:text-indigo-600">
                    support@habitspark.com
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a href="tel:+8801754423117" className="hover:text-indigo-600">
                    +880 1754-423117
                  </a>
                </li>
                <li>Dhaka, Bangladesh</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-3 text-slate-900">Quick Links</h3>
              <ul className="text-sm space-y-1 font-medium">
                <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
                <li><Link to="/AddHabbit" className="hover:text-indigo-600">Add Habit</Link></li>
                <li><Link to="/MyHabbit" className="hover:text-indigo-600">My Habits</Link></li>
                <li><Link to="/PublicHabbits" className="hover:text-indigo-600">Public Habits</Link></li>
                <li><Link to="/terms" className="hover:text-indigo-600">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-sm font-bold uppercase mb-3 text-slate-900">Follow Us</h3>
              <div className="space-y-2 text-sm font-medium">
                <a target="_blank" href="https://facebook.com" className="flex items-center gap-2 hover:text-indigo-600">
                  <FaFacebook className="text-lg" /> Facebook
                </a>
                <a target="_blank" href="https://x.com" className="flex items-center gap-2 hover:text-indigo-600">
                  <FaXTwitter className="text-lg" /> X (Twitter)
                </a>
                <a target="_blank" href="https://instagram.com" className="flex items-center gap-2 hover:text-indigo-600">
                  <FaInstagram className="text-lg" /> Instagram
                </a>
                <a target="_blank" href="https://linkedin.com" className="flex items-center gap-2 hover:text-indigo-600">
                  <FaLinkedin className="text-lg" /> LinkedIn
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-slate-300" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} HabitSpark. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Made with <span className="text-indigo-600">❤</span> by the HabitSpark Team
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
