import { useOutletContext } from "react-router-dom";

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
};

type OutletContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const Profile = () => {
  const { user } = useOutletContext<OutletContextType>();

  console.log("PROFILE USER:", user);

  // 💫 Loading skeleton (much nicer than text)
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md rounded-3xl p-8 bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl animate-pulse">

          <div className="w-28 h-28 mx-auto rounded-full bg-white/20" />

          <div className="h-6 w-40 mx-auto mt-6 bg-white/20 rounded" />

          <div className="h-4 w-28 mx-auto mt-3 bg-white/10 rounded" />

          <div className="h-4 w-32 mx-auto mt-2 bg-white/10 rounded" />

          <div className="h-4 w-24 mx-auto mt-2 bg-white/10 rounded" />

        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
    </div>
  );
};