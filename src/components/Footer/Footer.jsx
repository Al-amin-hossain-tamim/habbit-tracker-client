import React from "react";
import { Link } from "react-router";
import logo from "../../assets/habbit_logo.jpeg"
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-700 border-t border-slate-200 ">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo & Name */}
          <div>
            <div className="flex items-center gap-2 mb-4">
             <img className="w-[12%]" src={logo} alt="" />
              <h2 className="text-xl font-bold text-slate-900">
                Habit<span className="text-orange-500">Spark</span>
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Build better habits with HabitSpark — track progress, stay motivated, and grow every day.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-3 text-slate-900">Contact</h3>
            <ul className="text-sm space-y-1 font-medium">
              <li>
                Email:{" "}
                <a href="mailto:support@habitspark.com" className="hover:text-orange-500">
                  support@habitspark.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+880123456789" className="hover:text-orange-500">
                  +880 1754423117
                </a>
              </li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-3 text-slate-900">Quick Links</h3>
            <ul className="text-sm space-y-1 font-medium">
              <li>
                <Link to="/" className="hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/AddHabbit" className="hover:text-orange-500">
                  Add Habit
                </Link>
              </li>
              <li>
                <Link to="/MyHabbit" className="hover:text-orange-500">
                  My Habits
                </Link>
              </li>
              <li>
                <Link to="/PublicHabbits" className="hover:text-orange-500">
                  Public Habits
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-orange-500">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-3 text-slate-900">Follow Us</h3>
            <div className="flex flex-col font-medium">
              <p className="flex items-center gap-1 hover:text-orange-500">
                <span><FaFacebook /></span>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                 Facebook
              </a></p>
              <p className="flex items-center gap-1 hover:text-orange-500">
                <span><FaTwitterSquare /></span>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <i className="fa-brands fa-twitter text-lg hover:scale-110 transition-transform"></i>twitter
              </a>
              </p>
             <p className="flex items-center gap-1 hover:text-orange-500">
              <span><FaInstagramSquare /></span>
               <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram text-lg hover:scale-110 transition-transform"></i>instagram
              </a>
             </p>
             <p className="flex items-center gap-1 hover:text-orange-500">
              <span><FaLinkedin /></span>
               <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in text-lg hover:scale-110 transition-transform"></i>linkedin
              </a>
             </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-slate-300" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p className="font-medium">© {new Date().getFullYear()} HabitSpark. All rights reserved.</p>
          <p className="font-medium">
            Made with <span className="text-orange-500">❤</span> by the HabitSpark Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
