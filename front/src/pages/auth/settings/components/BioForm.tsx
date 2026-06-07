import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Context } from "../../../../helpers/types";
import { Http } from "../../../../config/api";

export const BioForm = () => {
  const { user, setUser } = useOutletContext<Context>();

  const [bio, setBio] = useState(user?.bio || "");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const saveBio = async () => {
    try {
      const res = await Http.patch("/account/bio", { bio });

      setUser({
        ...user!,
        bio: res.data.bio,
      });

      setMsg(res.data.message);
      setOpen(false);
    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-3 rounded-2xl bg-white/10 text-white font-bold"
      >
        ✍️ Edit Bio
      </button>

      {open && (
        <div className="mt-4 bg-white/10 p-4 rounded-2xl text-white">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-24 bg-white/10 p-2 rounded-xl"
          />

          <button
            onClick={saveBio}
            className="w-full mt-3 py-2 bg-purple-500 rounded-xl"
          >
            Save
          </button>

          {msg && <p className="mt-2">{msg}</p>}
        </div>
      )}
    </div>
  );
};