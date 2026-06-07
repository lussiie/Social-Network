import { useState } from "react";
import { Http } from "../../../config/api";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🟣 BIO UPDATE
  const updateBio = async () => {
    try {
      setLoading(true);
      await Http.patch("/account/bio", { bio });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 AVATAR UPDATE
  const updateAvatar = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profile-pic", file);

    try {
      setLoading(true);
      await Http.patch("/account/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-violet-500/20 bg-slate-950/90 p-8 shadow-[0_35px_120px_-45px_rgba(124,58,237,0.75)] backdrop-blur-xl">
      <div className="mb-8 rounded-[1.75rem] bg-gradient-to-br from-purple-950 via-purple-900 to-fuchsia-950 p-6 shadow-[0_20px_80px_-40px_rgba(124,58,237,0.6)]">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-200/80">Profile editor</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Update your profile</h1>
        <p className="mt-3 text-sm leading-6 text-violet-200/80">
          Customize your bio and avatar with a polished purple UI. Save changes to refresh your personal profile look.
        </p>
      </div>

      <div className="grid gap-6">
        <section className="rounded-[1.75rem] border border-violet-500/10 bg-slate-950/80 p-6 shadow-sm shadow-violet-500/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Avatar upload</h2>
              <p className="mt-2 text-sm text-slate-400">
                Choose a new profile picture and save it instantly.
              </p>
            </div>
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-violet-100 ring-1 ring-violet-400/20">
              Purple vibes
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block cursor-pointer rounded-3xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 text-sm text-violet-100 transition hover:bg-violet-500/10">
              <span>Select avatar image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
            {file ? (
              <p className="text-sm text-slate-300">Selected file: {file.name}</p>
            ) : (
              <p className="text-sm text-slate-500">No file selected yet.</p>
            )}

            <button
              onClick={updateAvatar}
              disabled={loading || !file}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/30 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Save Avatar"}
            </button>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-violet-500/10 bg-slate-950/80 p-6 shadow-sm shadow-violet-500/10">
          <h2 className="text-lg font-semibold text-white">Bio & details</h2>
          <p className="mt-2 text-sm text-slate-400">
            Add a personal touch with a clear, confident bio.
          </p>

          <div className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-slate-200">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[160px] w-full rounded-3xl border border-violet-500/20 bg-slate-900/90 px-4 py-4 text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20"
              placeholder="Write your bio..."
            />
          </div>

          <button
            onClick={updateBio}
            disabled={loading}
            className="mt-6 w-full rounded-3xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:bg-fuchsia-500 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Bio"}
          </button>
        </section>
      </div>

      <button
        onClick={() => navigate("/profile")}
        className="mt-8 w-full rounded-3xl border border-violet-500/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        Back to Profile
      </button>
    </div>
  );
};