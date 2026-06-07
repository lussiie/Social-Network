export const Messages = () => {
  const chats = [
    {
      id: 1,
      name: "Anna Smith",
      username: "anna_s",
      avatar: "https://i.pravatar.cc/100?img=1",
      lastMessage: "Hey! How are you?",
    },
    {
      id: 2,
      name: "John Doe",
      username: "john_d",
      avatar: "https://i.pravatar.cc/100?img=2",
      lastMessage: "Let's work on the project 🚀",
    },
    {
      id: 3,
      name: "Lily Brown",
      username: "lily_b",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHwH7_3fGMrjei_sEisHIPm8w760WVNGU6gA&s",
      lastMessage: "See you tomorrow!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-950 to-slate-950 px-4 py-12">

      <div className="mx-auto w-full max-w-2xl">

        {/* HEADER */}
        <div className="mb-8 rounded-[2rem] border border-violet-500/10 bg-gradient-to-br from-purple-950 via-violet-950 to-slate-950/90 p-6 shadow-[0_35px_120px_-60px_rgba(79,70,229,0.35)] backdrop-blur-xl ring-1 ring-white/5">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300 text-center">Messages</p>
          <h2 className="mt-3 text-4xl font-semibold text-white text-center">
            💬 Your Conversations
          </h2>
          <p className="mt-3 text-center text-slate-400">Stay connected with your friends</p>
        </div>

        {/* CHAT LIST */}
        <div className="space-y-4">

          {chats.map((chat) => (
            <div
              key={chat.id}
              className="group flex items-center gap-4 overflow-hidden rounded-[2rem] border border-violet-500/15 bg-gradient-to-br from-slate-950/95 via-violet-950/90 to-purple-950/95 p-4 shadow-[0_25px_70px_-40px_rgba(124,58,237,0.8)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(124,58,237,0.35)] cursor-pointer"
            >

              {/* AVATAR */}
              <img
                src={chat.avatar}
                alt={chat.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-violet-400/20 shadow-lg shadow-violet-500/20"
              />

              {/* INFO */}
              <div className="flex-1">
                <p className="text-white font-semibold text-lg group-hover:text-violet-100 transition">
                  {chat.name}
                </p>
                <p className="text-violet-300 text-sm">
                  @{chat.username}
                </p>
                <p className="text-slate-400 text-sm mt-1 truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {/* STATUS DOT */}
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></span>
              </span>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};