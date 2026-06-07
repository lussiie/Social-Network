import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Context } from "../../../../helpers/types";
import { Http } from "../../../../config/api";

export const PasswordForm = () => {
  const { user } = useOutletContext<Context>();

  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    try {
      const res = await Http.patch("/account/settings/password", {
        currentPassword,
        newPassword,
      });

      setMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setOpen(false);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Server error");
    }
  };

  if (!user) return null;

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full rounded-[1.75rem] bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 py-3 text-white font-semibold uppercase tracking-[0.12em]"
      >
        🔐 Change Password
      </button>

      {open && (
        <div className="mt-5 rounded-[2rem] border border-violet-500/15 bg-slate-950/95 p-6 text-white">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/5 mb-3"
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/5 mb-3"
          />

          <button
            onClick={handleChangePassword}
            className="w-full py-3 rounded-xl bg-purple-500"
          >
            Save Password
          </button>

          {message && <p className="mt-3 text-sm">{message}</p>}
        </div>
      )}
    </div>
  );
};