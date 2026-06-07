import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Http } from "../../config/api";

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
};

export const AuthLayout = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
  const loadUser = async () => {
    try {
      const res = await Http.get("/auth/user");

      console.log("PROFILE USER:", res.data);

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
      setUser(null);
      navigate("/signin");
    }
  };

  loadUser();
}, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[150px] top-10 left-10" />
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[180px] bottom-10 right-10" />

      {/* SIDEBAR */}
      <aside className="w-72 p-6 backdrop-blur-2xl bg-white/10 border-r border-white/10 flex flex-col gap-3 z-10 shadow-2xl">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6">
          My Profile
        </h1>

        <div className="text-sm text-white/60 mb-2">
          {user ? `Welcome, ${user.username}` : "Loading..."}
        </div>

        <NavItem to="/profile" label="Profile" end />
        <NavItem to="/profile/settings" label="Settings" />
        <NavItem to="/profile/followers" label="Followers" />
        <NavItem to="/profile/followings" label="Followings" />
        <NavItem to="/profile/messages" label="Messages" />
        <NavItem to="/profile/posts" label="Posts" />

        <button
          onClick={handleLogout}
          className="mt-auto py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-bold shadow-lg hover:scale-105 transition"
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10 z-10">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl p-8 min-h-full shadow-2xl">
          <Outlet context={{ user, setUser }} />
        </div>
      </main>
    </div>
  );
};

/* NAV ITEM */
const NavItem = ({
  to,
  label,
  end,
}: {
  to: string;
  label: string;
  end?: boolean;
}) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative px-4 py-2 rounded-2xl transition font-medium flex items-center gap-2
        ${
          isActive
            ? "bg-gradient-to-r from-purple-500/40 to-pink-500/30 text-white shadow-lg border border-white/20"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`
      }
    >
      {label}
    </NavLink>
  );
};