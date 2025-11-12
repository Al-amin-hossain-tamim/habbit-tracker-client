import React, { use } from "react";
import { NavLink } from "react-router";

import "./Navbar.css";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import profile from "../../assets/profile.png";

const Navbar = () => {
  const { user, signOutUser, loading, setLoading } = use(AuthContext);

  const handleSignOut = () => {
    setTimeout(() => {
      signOutUser()
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };
  return (
    <div className="bg-base-100 shadow-sm">
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
                <NavLink to="/" className="font-bold ">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/ToyGallery" className="font-bold ">
                  ToyGallery
                </NavLink>
              </li>
              <li>
                <NavLink to="/MyProfile" className="font-bold ">
                  My Profile
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <img className="w-[50px] rounded-full" src="alamin" alt="" />
            <a className=" text-xl font-bold ml-2">ToyTopia</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold text-xl">
            <li>
              <NavLink to="/" className="font-bold ">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/AddHabbit" className="font-bold ">
                Add Habit
              </NavLink>
            </li>

            <li>
              <NavLink to="/MyHabbit" className="font-bold ">
                MyHabbits
              </NavLink>
            </li>
            <li>
            <NavLink to= '/PublicHabbits'>
              Public Habbits
            </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end font-bold text-xl">
          {user ? (
            <div className="flex gap-2 items-center ">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName}
              >
                {user.photoURL ? (
                  <img
                    className="w-12 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                ) : (
                  <img className="w-12 rounded-full" src={profile} alt="" />
                )}
              </div>

              <button
                onClick={handleSignOut}
                className="font-bold hover:text-red-500"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <NavLink
              to="/Login"
              className=" font-bold text-xl hover:text-blue-400"
            >
              Login
            </NavLink> /
            <NavLink to='/Resister' className="font-bold text-xl">Signup</NavLink>
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
