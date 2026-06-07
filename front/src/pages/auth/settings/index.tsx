import { PrivacyForm } from "./components/PrivacyForm";
import { PasswordForm } from "./components/PasswordForm";
export const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-[2.5rem] border border-violet-500/10 bg-gradient-to-br from-purple-950 via-violet-950 to-slate-950/90 p-6 shadow-[0_35px_120px_-60px_rgba(79,70,229,0.35)] backdrop-blur-xl ring-1 ring-white/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300">
              Account Settings
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Secure your profile with style
            </h1>
          </div>
          <span className="inline-flex items-center rounded-full bg-violet-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-100 ring-1 ring-violet-400/20 shadow-sm">
            Purple theme enabled
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_-30px_rgba(124,58,237,0.4)] backdrop-blur-xl">
            <h3 className="text-lg font-semibold mb-3 text-white">Privacy</h3>
            <p className="text-sm text-slate-300">
              Control who sees your profile and keep your account protected.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_-30px_rgba(124,58,237,0.4)] backdrop-blur-xl">
            <h3 className="text-lg font-semibold mb-3 text-white">Password</h3>
            <p className="text-sm text-slate-300">
              Update your password with a secure and modern experience.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-violet-500/20 bg-slate-950/90 p-6 shadow-[0_32px_90px_-40px_rgba(124,58,237,0.45)]">
          <PrivacyForm />
        </div>
        <div className="rounded-[2rem] border border-violet-500/20 bg-slate-950/90 p-6 shadow-[0_32px_90px_-40px_rgba(124,58,237,0.45)]">
          <PasswordForm />
        </div>
      </div>
    </div>
  );
};