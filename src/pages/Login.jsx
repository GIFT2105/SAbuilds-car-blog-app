import React from "react";
import { auth, provider } from "../firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa'; // Import the Google icon

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="flex items-center flex-col justify-center mt-40 ">
      <p className="text-4xl font-first ">Sign In With Google to Continue</p>
      <div className=" flex  items-center flex-row w-72 h-auto font-first text-white text-2xl justify-center mt-10 bg-slate-400 rounded-full  ">
      <FaGoogle className="mr-3 " />
      <button className="" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
      {/* Use the Google icon component */}
    </div>
    </div>
  );
}

export default Login;
