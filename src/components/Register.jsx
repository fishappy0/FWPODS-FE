import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginPage = () => {
    navigate("/login");
  };

  function validateEmail(email) {
    /*
     * the regex checks for 3 things:
     * 1. the string only contains 1 "."
     * 2. exactly 1 "@" before the "."
     * 3. no "@" after the "."
     * returns false if the email doenst meet at least one of the criteria.
     */
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !name || !email || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("https://musicbe.fishand.me/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response?.ok) {
        throw new Error("Registering failed.");
      }

      toast.success("Successfully registered.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer autoClose={1500} />
      <main className="mx-auto flex min-h-screen w-full items-center justify-center text-white">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Register</div>

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
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-slate-500">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleRegister}
            className="transform rounded-sm bg-green-900 py-2 font-bold duration-300 hover:bg-green-700"
          >
            Register
          </button>

          <div className="flex items-center justify-center">
            <p className="text-center text-lg">Already have an account?</p>
            <button
              className="font-medium text-green-600 underline-offset-4 hover:underline ml-1"
              onClick={loginPage}
            >
              Login here
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
