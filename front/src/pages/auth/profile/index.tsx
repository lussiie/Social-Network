import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ImagePicker } from "./components/Image-picker";
import {Search} from "./components/Search";
/* =========================
   TYPES
========================= */
type User = {
  avatarURL?: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  followers?: any[];
  followings?: any[];
  posts?: any[];
};

type OutletContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

/* =========================
   CONSTANTS
========================= */
const DEFAULT_AVATAR =
  "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=6hQNACQQjktni8CxSS_QSPqJv2tycskYmpFGzxv3FNs=";

/* =========================
   COMPONENT
========================= */
export const Profile = () => {
  const { user, setUser } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();

  /* =========================
     STATE
  ========================= */
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  /* =========================
     HANDLERS
  ========================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  const handleRemovePhoto = () => {
    setFile(null);
    setPreview(null);
  };

  /* =========================
     GUARD
  ========================= */
  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-slate-300/80 animate-pulse text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-950 to-slate-950 px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-purple-500/20 bg-purple-950/80 p-1 shadow-[0_30px_120px_rgba(79,70,229,0.25)] backdrop-blur-xl">
        <div className="rounded-[1.75rem] bg-slate-950/95 px-8 py-10 shadow-2xl shadow-violet-950/40 ring-1 ring-purple-500/10">

          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-violet-400/20 blur-3xl" />
              <img
                src={preview || user.avatarURL || DEFAULT_AVATAR}
                alt="Profile avatar"
                className="relative h-40 w-40 rounded-full border-4 border-purple-300/20 object-cover shadow-2xl shadow-purple-500/30"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <ImagePicker
                onSelect={(file, preview) => {
                  setFile(file);
                  setPreview(preview);
                }}
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="rounded-2xl border border-purple-400/20 bg-purple-500/10 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-purple-300/30 hover:bg-purple-500/15"
              >
                Remove Photo
              </button>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-slate-400">@{user.username}</p>
              <p className="mx-auto max-w-2xl text-base leading-7 text-slate-300">
                {user.bio || "No bio added yet. Add a short description to tell people about yourself."}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-purple-400/20 bg-purple-950/80 p-6 text-center transition hover:-translate-y-1 hover:border-purple-300/30 hover:bg-purple-900/95">
              <p className="text-3xl font-semibold text-white">{user.posts?.length || 0}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.24em] text-purple-200/80">Posts</p>
            </div>
            <div className="rounded-3xl border border-purple-400/20 bg-purple-950/80 p-6 text-center transition hover:-translate-y-1 hover:border-purple-300/30 hover:bg-purple-900/95">
              <p className="text-3xl font-semibold text-white">{user.followers?.length || 0}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.24em] text-purple-200/80">Followers</p>
            </div>
            <div className="rounded-3xl border border-purple-400/20 bg-purple-950/80 p-6 text-center transition hover:-translate-y-1 hover:border-purple-300/30 hover:bg-purple-900/95">
              <p className="text-3xl font-semibold text-white">{user.followings?.length || 0}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.24em] text-purple-200/80">Following</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/profile/edit")}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
        <Search/>
      </div>
      
    </div>
  );
};