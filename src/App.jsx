import { useState } from 'react'
import Login from "./pages/Login";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css"
import { signOut } from "firebase/auth";
import { auth } from "./firebaseconfig";
import Home from "./pages/Home";
import CreatePost from "./pages/createpost";
import About from './pages/About';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };


  return (
    <Router >
    <div>
    <nav className='font-serif   flex justify-evenly flex-col   text-xs h-6    bg-white     ' >
     <div className='flex justify-evenly  space-x-4'>
     <Link  to="/"> Home </Link>
     <Link to="/About"> About </Link>
     
     


      {!isAuth ? (
        <Link to="/login"> Login </Link>
      ) : (
        <>
        
          <Link to="/createpost"> Create Post </Link>
          <button onClick={signUserOut}> Log Out</button>
         
        </>
      )}
      </div> 
    </nav>
    

    <Routes>
      <Route path="/" element={<Home isAuth={isAuth} />} />
      <Route path="/About" element={<About />} />
      <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
    </Routes>
    </div>
  </Router>
  
);
}

export default App;