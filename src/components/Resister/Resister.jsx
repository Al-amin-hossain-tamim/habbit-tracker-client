import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const Resister = () => {
  const [error, setError] = useState("");

  const { createUser, signInWithGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // reset error
    setError("");

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

    if (!emailValidation.test(email)) {
      return setError("please give me valid email");
    } else if (!passwordValidation.test(password)) {
      return setError(
        "please ensure one upper,lower case and one digit and special character and at least 6 characters"
      );
    }

    createUser(email, password)
      .then((result) => {
        e.target.reset();
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(result.user, profile)
          .then(() => {})
          .catch();
        navigate(location?.state || "/");
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // create user in the database

        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after user save", data);
          });
      })
      .catch((error) => {
        setError("this email already used!");
        error && toast.error(error);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(location?.state || "/");
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // create user in the database

        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after user save", data);
          });
      })

      .catch(() => {});
  };
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordBtn = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  // used email toastify

  return (
    <div className="card bg-base-100 w-full mx-auto my-15 max-w-sm shrink-0 shadow-2xl">
      <title>Signup</title>
      <div className="card-body">
        <h1 className="text-5xl font-bold">Signup now!</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="NAME"
              name="name"
              required
            />
            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="EMAIL"
              name="email"
              required
            />
            {/* photo field */}
            <label className="label">Photo</label>
            <input
              type="text"
              className="input"
              placeholder="PHOTOURL"
              name="photo"
            />
            {/* password field */}
            <label className="label">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="password"
                name="password"
                required
              />
              <button
                onClick={handlePasswordBtn}
                className="absolute btn btn-xs top-2 right-5"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <button className="btn btn-neutral mt-4">Signup</button>
          </fieldset>
        </form>
        <button onClick={handleSignInWithGoogle} className="btn mt-2 w-full">
          <span className="w-[15px]">
            <svg
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-18.7-1.6-37.2-4.8-55H272v104.4h146.9c-6.3 34-25 62.9-53.5 82.2v68.3h86.4c50.6-46.6 81.7-115.4 81.7-199.0z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.9 0 134.1-24.2 178.8-65.6l-86.4-68.3c-24 16.2-54.6 25.8-92.4 25.8-70.9 0-131.2-47.9-152.6-112.2H32v70.6C76.2 487.1 167.7 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M119.4 324.0c-8.0-23.9-8.0-49.5 0-73.4V179.9H32c-40.6 80.0-40.6 173.5 0 253.5l87.4-109.4z"
              />
              <path
                fill="#EA4335"
                d="M272 109.6c39.6 0 75.1 13.6 103.1 40.3l77.2-77.2C403.9 26.8 349.9 0 272 0 167.7 0 76.2 57.2 32 142.8l87.4 70.6C140.8 157.5 201.1 109.6 272 109.6z"
              />
            </svg>
          </span>{" "}
          google with login
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <h5>
          Already you have account?Please,{" "}
          <Link
            to="/Login"
            className="text-blue-600 underline text-[16px] font-medium"
          >
            Login
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Resister;
