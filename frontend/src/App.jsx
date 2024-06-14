import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
// import { IoSunnyOutline } from "react-icons/io5";
import { useAuthContext } from "./context/AuthContent";
function App() {
  const { authUser } = useAuthContext();
  // let bg = true;
  // const changeStyle = () => {
  //   if (bg) {
  //     // document.body.style.backgroundColor = "#2f4f4f";
  //     document.body.style.backgroundImage = "url('bg.png')";
  //     return (bg = false);
  //   }
  //   // document.body.style.backgroundColor = "#000000";

  //   document.body.style.backgroundImage = "url('bn.png')";
  //   return (bg = true);
  // };
  return (
    <>
      <div className="p-4 h-screen flex  items-center justify-center">
        {/* <div className="">
          <button onClick={changeStyle}>
            <IoSunnyOutline />  
          </button>
        </div> */}
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
