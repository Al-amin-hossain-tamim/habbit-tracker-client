import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import Loading from "../Loading/Loading";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";


const Login = () => {
  
  const [loading,setLoading] = useState(false)
  const [showPassword,setShowPassword] = useState(false);
  const {signInUser,signInWithGoogle,user} = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate()
  const emailRef = useRef()
  const [Error,setError] = useState('');
  

  

  const handleLogin = (e)=>{
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true)
    setError('');
    signInUser(email,password)
    .then(() =>{
       
      e.target.reset()
      navigate(location?.state || '/')
    })
    .catch(()=>{
      
      setError('miss matched credential if you are new  please register first')
      user || toast.error(Error)
      
    }).finally(()=>{
      setLoading(false)
    })
  }
  const handleGoogleLogin = ()=>{
      signInWithGoogle()
      .then((result)=>{
        navigate(location?.state|| '/')

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
      .catch(()=>{
        
      })
  }
 
  // const handleForgetPassword = ()=>{
  //   const email = emailRef.current.value;
  //   if (email) {
  //     navigate(`/forget-password/${encodeURIComponent(email)}`);
  //   } else {
  //     navigate(`/forget-password`);
  //   }
  // }

  const handlePasswordBtn = (e)=>{
      e.preventDefault()
      setShowPassword(!showPassword);
    }
  
  return (
    
    <div className="hero bg-base-200 min-h-screen mb-10">
      <title></title>
      {
        (
          loading && <div className='flex w-full min-h-screen justify-center inset-0  z-100 bg-black bg-opacity-30 items-center'>
            <p className='text-2xl font-bold  text-white'><span className="loading loading-bars loading-xl "></span> <span>Loading please wait!!</span></p>
        </div>
        )
      }
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left"></div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                {/* email */}
                <label className="label">EMAIL</label>
                <input type="email" className="input" placeholder="Email" name="email" required ref={emailRef}/>
                {/* password */}
                <label className="label">PASSWORD</label>
                <div className='relative'>
                                  <input
                                  type={showPassword?'text':'password'}
                                  className="input"
                                  placeholder= "password"
                                  name='password'
                                  required
                                />
                                <button onClick={handlePasswordBtn} className='absolute btn btn-xs top-2 right-5'>{
                                  showPassword ? <FaRegEyeSlash /> : <FaRegEye /> 
                                  }</button>
                                </div>
                                {/* onClick={handleForgetPasswordBtn} */}
                
                <div >
                  
                  <button className="link link-hover">Forgot password?</button>
                  
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </form>
            <button onClick={handleGoogleLogin} className="btn mt-2 w-full">
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
            <h5>If you are new here?Please, <Link to='/Resister' className="text-[#f2098c] underline text-[16px] font-medium">Signup</Link></h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
