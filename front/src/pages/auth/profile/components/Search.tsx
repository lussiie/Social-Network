import { useEffect, useState, useRef } from "react";
import type { Account } from "../../../../helpers/types";
import { Http } from "../../../../config/api";
import { Link } from "react-router-dom";

export const Search = () => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState<Account[]>([]);
  const preloaded = useRef(false);

  useEffect(() => {
    if (preloaded.current) {
      Http.get(`/account/search/${text}`)
        .then((response) => {
          const data = response.data;

          if (Array.isArray(data)) {
            setUsers(data);
          } else if (Array.isArray(data.users)) {
            setUsers(data.users);
          } else {
            setUsers([]);
          }
        })
        .catch((error) => {
          console.error(error);
          setUsers([]);
        });
    }

    preloaded.current = true;
  }, [text]);

  const clear = () => {
    setText("");
    setUsers([]);
  };

  const initials = (u: Account) => {
    const a = (u.firstName || "").charAt(0) || "";
    const b = (u.lastName || "").charAt(0) || "";
    return (a + b).toUpperCase();
  };

  return (
    <>
      <div className="my-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_40px_120px_-60px_rgba(124,58,237,0.55)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-purple-300">
              Search for friends
            </p>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Find friends faster
            </h2>
          </div>

          <span className="inline-flex items-center rounded-full bg-violet-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-200 ring-1 ring-violet-400/20">
            Found <span className="ml-2 font-semibold text-white">{users.length}</span>
          </span>
        </div>

        <div className="relative mt-6">
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-300/80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search by username, email or name"
            className="w-full max-w-2xl rounded-3xl border border-violet-500/20 bg-slate-900/90 px-10 py-3 text-sm text-white shadow-[0_18px_50px_-30px_rgba(15,23,42,0.9)] transition duration-300 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            aria-label="Search for friends"
          />

          {text ? (
            <button
              onClick={clear}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 p-2 text-violet-100 transition hover:bg-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
              aria-label="Clear search"
              title="Clear"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : null}
        </div>

        <p className="mt-3 text-sm text-slate-400">
          {users.length > 0
            ? `Showing ${users.length} result${users.length !== 1 ? "s" : ""}`
            : text
            ? "No results found"
            : "Type a name, username, or email to discover friends."}
        </p>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="group flex items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] border border-purple-500/10 bg-gradient-to-br from-slate-950/95 via-violet-950/90 to-purple-950/95 p-4 shadow-[0_25px_70px_-40px_rgba(124,58,237,0.8)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(124,58,237,0.35)]"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                {user.avatarURL ? (
                  <img
                    src={user.avatarURL}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-14 w-14 rounded-full border-2 border-violet-400/20 object-cover shadow-lg shadow-violet-500/20"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10 text-sm font-semibold text-violet-200 ring-1 ring-violet-400/20">
                    {initials(user)}
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-white transition group-hover:text-violet-100">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-violet-300">@{user.username}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/profile/view/${user.username}`}
               className="rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30"
              >
                View
              </Link>
              </div>
          </div>
        ))}

        {users.length === 0 && text ? (
          <div className="rounded-[1.75rem] border border-dashed border-violet-500/20 bg-slate-950/80 p-8 text-center text-sm text-slate-400 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.9)]">
            No users matched your search.
          </div>
        ) : null}
      </div>
    </>
  );
};