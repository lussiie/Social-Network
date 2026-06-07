import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Http } from "../../../config/api";

type AuthUser = {
  username: string;
  password: string;
};

export const Signin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUser>();

 const handleLogin: SubmitHandler<AuthUser> = async (data) => {
  try {
    const res = await Http.post("/auth/signin", data);

    const token = res.data?.token;

    if (!token) {
      console.log("No token received");
      return;
    }

    localStorage.setItem("token", token);

    console.log("SUCCESS:", res.data);

    navigate("/profile", { replace: true });
  } catch (err: any) {
    console.log("ERROR:", err?.response?.data || err.message);
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#6D28D9] overflow-hidden px-4">
      
      {/* Background Blur */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-500/30 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-pink-500/20 blur-[140px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-10 rounded-2xl bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl">
        
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 mb-3">
          Sign In
        </h1>

        <p className="text-white/90 text-center mb-8">
          Welcome back! Sign in to your account
        </p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-5"
        >
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-white font-medium"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="px-5 py-3 rounded-2xl border border-purple-400/40 bg-white/30 text-[#1E1B4B] placeholder:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              {...register("username", {
                required: "Username is required",
              })}
            />

            {errors.username && (
              <span className="text-red-300 text-xs">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-white font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="px-5 py-3 rounded-2xl border border-indigo-400/40 bg-white/30 text-[#1E1B4B] placeholder:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            {errors.password && (
              <span className="text-red-300 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="#"
              className="text-sm text-pink-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-bold text-lg shadow-xl hover:scale-105 transition"
          >
            Sign In
          </button>
        </form>

        {/* Signup */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-white text-sm">
            Don't have an account?
          </span>

          <Link
            to="/signup"
            className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};