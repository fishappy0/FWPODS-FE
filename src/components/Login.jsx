import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const registerPage = () => {
    navigate("/register")
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!username || !password) {
      toast.error("Please enter your username and password.");
      return;
    }

    toast.info("Logging in...")

    try {
      const response = await fetch("https://musicbe.fishand.me/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        toast.error("Login failed. Please check your username and password.")
        return
      }

      const data = await response.json();
      console.log("Login successful: ", data.token)
      toast.success("Successfully logged in.")

      localStorage.setItem("token", data.token)
      localStorage.setItem("username", username)
      setIsLoggedIn(true)

      // very hack-y way to do this.
      setTimeout(() => {
        navigate("/")
      }, 2000)

    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <div>
      <ToastContainer autoClose={1500} />
      <main className="mx-auto flex min-h-screen w-full items-center justify-center text-white">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Log In</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-slate-500">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-slate-500">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button
            onClick={handleLogin}
            className="transform rounded-sm bg-green-900 py-2 font-bold duration-300 hover:bg-green-700"
          >
            Login
          </button>

          <button className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">
            Forgot your password?
          </button>
          <div className="flex items-center justify-center">
            <p className="text-center text-lg">Don&apos;t have an account?</p>
            <button className="font-medium text-green-600 underline-offset-4 hover:underline ml-1" onClick={registerPage}>
              Create one here
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
