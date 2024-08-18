import { Route, Routes } from "react-router-dom";
import { useRef, useEffect } from "react"

import Login from "./Login"
import Home from "./Home"
import Register from "./Register";

const Layout = () => {
  const displayRef = useRef()

  useEffect(() => {
    displayRef.current.style.background = `#121212`
  })

  return (
    <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Layout;
