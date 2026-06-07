import { useParams } from "react-router-dom";
import { useGet } from "../../../helpers/hooks/useGet";
import type { Account as Accounttype } from "../../../helpers/types";
import { Http } from "../../../config/api";

type Response = {
  followsMe: boolean;
  requestSent: boolean;
  followStatus: boolean;
  user: Accounttype;
};

const DEFAULT_AVATAR =
  "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg";

export const Account = () => {
  const { username } = useParams();

  const { loading, error, data, refetch } = useGet<Response>(
    username ? `/account/${username}` : null
  );

  const handleRequest = async () => {
    try {
      await Http.post(`/follow/${data?.user.id}`);
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 px-8 py-10 shadow-2xl shadow-slate-950/40">
          <p className="text-lg font-semibold text-purple-300">Loading profile...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-16 text-center">
        <div className="rounded-3xl border border-red-500/20 bg-slate-900/90 px-8 py-10 shadow-2xl shadow-slate-950/40">
          <p className="text-lg font-semibold text-red-300">Error: {error}</p>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 px-8 py-10 shadow-2xl shadow-slate-950/40">
          <p className="text-lg font-semibold text-slate-300">No profile data found.</p>
        </div>
      </div>
    );

  const { user, followsMe, requestSent, followStatus } = data;
  const followLabel = requestSent
    ? "Cancel request"
    : followsMe
    ? "Follow back"
    : followStatus
    ? "Unfollow"
    : "Follow";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <div className="relative mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-purple-400/30 bg-slate-800 shadow-lg shadow-purple-500/10">
              <img
                src={user.avatarURL || DEFAULT_AVATAR}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-2 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-300/80">Account profile</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-slate-400">@{user.username}</p>
            </div>

            <button
              onClick={handleRequest}
              className="w-full rounded-3xl bg-purple-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:bg-purple-400"
            >
              {followLabel}
            </button>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Privacy</p>
              <p className="mt-3 text-base text-slate-200">
                {user.isAccountPrivate ? "Private account" : "Public account"}
              </p>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-purple-300/80">About</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Welcome to the profile</h2>
                </div>
                <span className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300">
                  {user.followers.length} followers · {user.followings.length} following
                </span>
              </div>

              <p className="mt-6 text-base leading-7 text-slate-300">
                {user.bio || "This user has not added a bio yet, but the profile is looking incredible."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Posts</p>
                <p className="mt-4 text-3xl font-semibold text-white">{user.posts.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Followers</p>
                <p className="mt-4 text-3xl font-semibold text-white">{user.followers.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Following</p>
                <p className="mt-4 text-3xl font-semibold text-white">{user.followings.length}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <h3 className="text-xl font-semibold text-white">Profile details</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Username</p>
                  <p className="mt-2 text-sm text-slate-200">@{user.username}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Account type</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {user.isAccountPrivate ? "Private" : "Public"}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Connections</p>
                  <p className="mt-2 text-sm text-slate-200">{user.followers.length + user.followings.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Requests</p>
                  <p className="mt-2 text-sm text-slate-200">{requestSent ? "Pending" : "None"}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};