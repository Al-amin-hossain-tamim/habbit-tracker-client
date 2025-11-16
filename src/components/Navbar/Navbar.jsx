import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import "./Navbar.css";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import profile from "../../assets/profile.png";
import logo from "../../assets/habbit_logo.jpeg";

const Navbar = () => {
  const { loginUser, signOutUser, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // dropdown open state & ref for outside click
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOutUser();
      navigate("/Login");
    } catch (err) {
      // keep it silent or show toast/swal in your app's consistent style
      console.error("Sign out failed", err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const activeClass = (isActive) =>
    `font-semibold text-base transition-colors duration-200 ${
      isActive
        ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
        : "text-slate-700 hover:text-indigo-500"
    }`;

  return (
    <div className="bg-gray-200 shadow-sm">
      {/* Loading overlay (keeps full-screen overlay while loading) */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <span className="loading loading-spinner loading-xl text-white" />
        </div>
      )}

      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            {/* mobile hamburger */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            {/* mobile menu content */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" className={({ isActive }) => activeClass(isActive)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/AddHabbit" className={({ isActive }) => activeClass(isActive)}>
                  Add Habit
                </NavLink>
              </li>
              <li>
                <NavLink to="/MyHabbit" className={({ isActive }) => activeClass(isActive)}>
                  My Habits
                </NavLink>
              </li>
              <li>
                <NavLink to="/PublicHabbits" className={({ isActive }) => activeClass(isActive)}>
                  Public Habits
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img className="w-10 h-10 rounded-full object-cover" src={logo} alt="logo" />
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-slate-900">Habit</span>
              <span className="text-indigo-600">Spark</span>
            </h1>
          </div>
        </div>

        {/* center links for desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 items-center">
            <li>
              <NavLink to="/" className={({ isActive }) => activeClass(isActive)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/AddHabbit" className={({ isActive }) => activeClass(isActive)}>
                Add Habit
              </NavLink>
            </li>
            <li>
              <NavLink to="/MyHabbit" className={({ isActive }) => activeClass(isActive)}>
                My Habits
              </NavLink>
            </li>
            <li>
              <NavLink to="/PublicHabbits" className={({ isActive }) => activeClass(isActive)}>
                Public Habits
              </NavLink>
            </li>
          </ul>
        </div>

        {/* right side: user avatar / login signup */}
        <div className="navbar-end font-bold text-xl" ref={dropdownRef}>
          {loginUser ? (
            <div className="relative">
              {/* Avatar button toggles dropdown */}
              <button
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-2 focus:outline-none"
                aria-expanded={open}
              >
                <img
                  className="w-12 h-12 rounded-full object-cover border"
                  src={loginUser.photoURL || profile}
                  alt={loginUser.displayName || "User avatar"}
                />
              </button>

              {/* Dropdown: only displayName, email, Log out */}
              {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-lg ">
                  <div className="px-4 py-3 border-b">
                    <div className="font-semibold text-slate-800 text-sm">
                      {loginUser.displayName || "User"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{loginUser.email}</div>
                  </div>

                  <div className="px-4 py-3">
                    <button
                      onClick={handleSignOut}
                      className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 text-base">
              <NavLink to="/Login" className={({ isActive }) => activeClass(isActive)}>
                Login
              </NavLink>
              <span>/</span>
              <NavLink
                to="/Resister"
                className={({ isActive }) =>
                  `font-semibold text-base transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-slate-700 hover:text-indigo-500"
                  }`
                }
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
