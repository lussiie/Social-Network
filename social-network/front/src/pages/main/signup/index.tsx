import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Http } from "../../../config/api";

export const Signup = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await Http.post("/auth/signup", fields);

      console.log("SUCCESS:", res.data);

      navigate("/signin");
    } catch (err: any) {
      console.log("ERROR:", err?.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#6D28D9] px-4">

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-2xl flex flex-col gap-4"
      >
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Create Account
        </h1>

        <p className="text-center text-white/70 mb-4">
          Create your new account
        </p>

        <div className="grid grid-cols-2 gap-4">
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={fields.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/20 text-white placeholder:text-white/60 border border-white/20 outline-none"
          />

          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={fields.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/20 text-white placeholder:text-white/60 border border-white/20 outline-none"
          />
        </div>

        <input
          id="username"
          type="text"
          placeholder="Username"
          value={fields.username}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-2xl bg-white/20 text-white placeholder:text-white/60 border border-white/20 outline-none"
        />

        <input
          id="password"
          type="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-2xl bg-white/20 text-white placeholder:text-white/60 border border-white/20 outline-none"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg hover:scale-105 transition"
        >
          Create Account
        </button>

        <p className="text-center text-white/80 text-sm mt-2">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-pink-300 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};