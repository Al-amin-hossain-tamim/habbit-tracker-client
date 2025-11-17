import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [Error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    setError("");

    signInUser(email, password)
      .then(() => {
        e.target.reset();
        navigate(location?.state || "/");
      })
      .catch(() => {
        setError("Miss matched credentials. If new, please register first.");
        toast.error("Invalid email or password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        navigate(location?.state || "/");

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        fetch("https://habbit-tracker-api-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handlePasswordBtn = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero bg-base-200 min-h-screen mb-10">
      <title>HabitSpark/login</title>
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-indigo-600"></span>
            <p className="text-white mt-3 font-medium">Please wait...</p>
          </div>
        </div>
      )}

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                {/* Email */}
                <label className="label">EMAIL</label>
                <input
                  type="email"
                  className="input input-bordered focus:border-indigo-600"
                  placeholder="Email"
                  name="email"
                  required
                  ref={emailRef}
                />

                {/* Password */}
                <label className="label mt-3">PASSWORD</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pr-12 focus:border-indigo-600"
                    placeholder="Password"
                    name="password"
                    required
                  />
                  <button
                    onClick={handlePasswordBtn}
                    className="absolute btn btn-xs top-2 right-3 text-indigo-600"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>

                {/* Login Button */}
                <button className="btn w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
                  Login
                </button>
              </fieldset>
            </form>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="btn mt-3 w-full border-indigo-600 text-indigo-700 hover:bg-indigo-100"
            >
              <span className="w-[15px]">
                <svg
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M533.5 278.4c0-18.7-1.6-37.2-4.8-55H272v104.4h146.9
                    c-6.3 34-25 62.9-53.5 82.2v68.3h86.4
                    c50.6-46.6 81.7-115.4 81.7-199.0z"
                  />
                  <path
                    fill="#34A853"
                    d="M272 544.3c72.9 0 134.1-24.2 178.8-65.6l-86.4-68.3
                    c-24 16.2-54.6 25.8-92.4 25.8
                    c-70.9 0-131.2-47.9-152.6-112.2H32v70.6
                    C76.2 487.1 167.7 544.3 272 544.3z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M119.4 324.0c-8.0-23.9-8.0-49.5 0-73.4V179.9H32
                    c-40.6 80.0-40.6 173.5 0 253.5l87.4-109.4z"
                  />
                  <path
                    fill="#EA4335"
                    d="M272 109.6c39.6 0 75.1 13.6 103.1 40.3l77.2-77.2
                    C403.9 26.8 349.9 0 272 0
                    C167.7 0 76.2 57.2 32 142.8l87.4 70.6
                    C140.8 157.5 201.1 109.6 272 109.6z"
                  />
                </svg>
              </span>
              Google Login
            </button>

            <h5 className="mt-4 text-sm">
              New here?{" "}
              <Link
                to="/Resister"
                className="text-indigo-600 underline font-medium"
              >
                Signup
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
