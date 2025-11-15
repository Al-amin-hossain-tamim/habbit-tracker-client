import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import "./Navbar.css";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import profile from "../../assets/profile.png";
import logo from "../../assets/habbit_logo.jpeg"

const Navbar = () => {
  const { loginUser, signOutUser, loading, setLoading } = use(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setTimeout(() => {
      signOutUser()
        .then(() => {
          navigate('/Login')
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };
  return (
    <div className="bg-gray-200 shadow-sm">
      {loading && (
        <div className="flex w-full min-h-screen justify-center inset-0  z-50 bg-black bg-opacity-30 items-center">
          <p className="text-2xl font-bold  text-white">
            <span className="loading loading-spinning loading-xl "></span>{" "}
          </p>
        </div>
      )}
      <div className="navbar  w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `font-semibold text-base transition-colors duration-200 ${
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                        : "text-slate-700 hover:text-orange-500"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/AddHabbit"
                  className={({ isActive }) =>
                    `font-semibold text-base transition-colors duration-200 ${
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                        : "text-slate-700 hover:text-orange-500"
                    }`
                  }
                >
                  Add Habit
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/MyHabbit"
                  className={({ isActive }) =>
                    `font-semibold text-base transition-colors duration-200 ${
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                        : "text-slate-700 hover:text-orange-500"
                    }`
                  }
                >
                  My Habits
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/PublicHabbits"
                  className={({ isActive }) =>
                    `font-semibold text-base transition-colors duration-200 ${
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                        : "text-slate-700 hover:text-orange-500"
                    }`
                  }
                >
                  Public Habits
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            {/* Icon */}
            
                  <img className="w-[12%] rounded-full" src={logo} alt="" />

            {/* Text */}
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-slate-900">Habit</span>
              <span className="text-orange-500">Spark</span>
            </h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-semibold text-base transition-colors duration-200 ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "text-slate-700 hover:text-orange-500"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/AddHabbit"
                className={({ isActive }) =>
                  `font-semibold text-base transition-colors duration-200 ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "text-slate-700 hover:text-orange-500"
                  }`
                }
              >
                Add Habit
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/MyHabbit"
                className={({ isActive }) =>
                  `font-semibold text-base transition-colors duration-200 ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "text-slate-700 hover:text-orange-500"
                  }`
                }
              >
                My Habits
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/PublicHabbits"
                className={({ isActive }) =>
                  `font-semibold text-base transition-colors duration-200 ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "text-slate-700 hover:text-orange-500"
                  }`
                }
              >
                Public Habits
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end font-bold text-xl">
          {loginUser ? (
            <div className="flex gap-2 items-center ">
              <div
                className="tooltip tooltip-bottom"
                data-tip={loginUser.displayName}
              >
                {loginUser.photoURL ? (
                  <img
                    className="w-12 rounded-full"
                    src={loginUser?.photoURL}
                    alt=""
                  />
                ) : (
                  <img className="w-12 rounded-full" src={profile} alt="" />
                )}
              </div>

              <button
                onClick={handleSignOut}
                 className="btn btn-outline btn-sm border-purple-500 text-purple-600 font-semibold hover:bg-purple-100 transition text-sm"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <NavLink
                to="/Login"
                 className={({ isActive }) =>
                  `font-semibold text-base transition-colors duration-200 ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "text-slate-700 hover:text-blue-500"
                  }`
                }
              >
                Login
              </NavLink>{" "}
              /
              <NavLink to="/Resister"  className={({ isActive }) =>
                  `font-semibold text-base transition-colors duration-200 ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "text-slate-700 hover:text-red-500"
                  }`
                }>
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
