import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-60">
      <title>Error-404</title>
      <h1 className="text-[#f20909] font-bold text-7xl mb-5">404</h1>
      <h1 className="text-4xl font-bold mb-3">Oops! Page Not Found</h1>
      <h4 className="text-xl font-medium mb-5">The page you are looking for does not exist or has been moved.</h4>
      <Link className="text-white bg-blue-700 btn " to='/'>Go Back Home</Link>
    </div> 
  );
};

export default ErrorPage;
