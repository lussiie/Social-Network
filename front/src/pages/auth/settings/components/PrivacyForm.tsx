import { useOutletContext } from "react-router-dom";
import type { Context } from "../../../../helpers/types";
import { Http } from "../../../../config/api";

export const PrivacyForm = () => {
  const { user, setUser } = useOutletContext<Context>();

  const togglePrivacy = async () => {
    if (!user) return;

    try {
      // 1. backend update
      await Http.patch("/account/privacy");

      // 2. նոր user ստանալ backend-ից
      const res = await Http.get("/auth/user");

      // 3. update global state
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;


  return (
    <div className="w-full bg-white/5 backdrop-blur-3xl border border-violet-500/10 shadow-[0_40px_100px_-45px_rgba(124,58,237,0.45)] rounded-[2rem] p-8 text-center text-white">
      <div className="mb-6 flex items-center justify-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-100 shadow-inner shadow-violet-500/10">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M17 8V6a5 5 0 00-10 0h2a3 3 0 016 0v2H6a2 2 0 00-2 2v10a3 3 0 003 3h10a3 3 0 003-3V10a2 2 0 00-2-2h-3z" />
          </svg>
        </span>
        <div className="text-left">
          <p className="text-sm uppercase tracking-[0.25em] text-violet-300">Privacy</p>
          <h2 className="text-2xl font-semibold text-white">Account Protection</h2>
        </div>
      </div>

      <div className="mx-auto max-w-xs rounded-[1.75rem] border border-violet-500/10 bg-slate-950/80 px-5 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">Privacy Mode</p>
            <p className="mt-1 text-base font-semibold text-white">
              {user.isAccountPrivate ? "Private" : "Public"}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
              user.isAccountPrivate
                ? "bg-violet-500/20 text-violet-100"
                : "bg-indigo-500/20 text-indigo-100"
            }`}
          >
            {user.isAccountPrivate ? "Locked" : "Open"}
          </span>
        </div>
      </div>

      <button
        onClick={togglePrivacy}
        className={`mt-6 w-full rounded-3xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] shadow-lg transition ${
          user.isAccountPrivate
            ? "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
            : "bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
        }`}
      >
        {user.isAccountPrivate ? "Make Public" : "Make Private"}
      </button>
    </div>
  );
};