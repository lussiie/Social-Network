import { useRouteError, Link } from "react-router-dom";

export const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-8xl font-bold text-purple-500">
          {error?.status || "404"}
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Oops! Something went wrong
        </h2>

        <p className="mt-3 text-slate-400">
          {error?.statusText ||
            error?.message ||
            "The page you are looking for doesn't exist."}
        </p>

        <Link
          to="/profile"
          className="inline-block mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};