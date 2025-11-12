import { useParams } from "react-router";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase.config";


const ForgetPassword = () => {
  const { email } = useParams();
  const [userEmail, setUserEmail] = useState(decodeURIComponent(email || ""));

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      toast.error("Error!", "Please enter your email address.", "error");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, userEmail);
      toast.error(
        "Check Your Email",
        "Password reset link sent! Redirecting to Gmail...",
        "success"
      );
      // Redirect to Gmail after 2 seconds
      setTimeout(() => {
        window.location.href = "https://mail.google.com/";
      }, 2000);
    } catch (error) {
      toast.error("Error!", error.message, "error");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
        Reset Password
      </h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter your email"
          className="input input-bordered w-full mb-4"
        />
        <button type="submit" className="btn btn-primary w-full">
          Reset Password
        </button>
      </form>
      
    </div>
  );
};

export default ForgetPassword;
