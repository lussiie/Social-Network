export const Followings = () => {
  const followings = [
    {
      id: 1,
      name: "Michael Jordan",
      username: "mj23",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 2,
      name: "Emma Watson",
      username: "emma_w",
      avatar: "https://scontent.cdninstagram.com/v/t51.82787-19/710868865_18050666255761968_3534743860068867493_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=107&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=ZTV39y8ETn4Q7kNvwF6y_g1&_nc_oc=AdpKZRgFGLjBumLRsxwm_fAnhqOsf4C_Jd-Ls20AhbFIPAIoofNIfWF9POYjbqE_Z-Y&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=pM9MIMh668jvjKCea8UZHg&_nc_ss=7baaf&oh=00_Af4V4cWbdzjCkN-tpSAGfnOYF-WwpDw2AEXrAPJQ3coATQ&oe=6A1FC7F1",
    },
    {
      id: 3,
      name: "Chris Evans",
      username: "cap_steve",
      avatar: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-950 to-slate-950 px-4 py-12">

      <div className="mx-auto w-full max-w-2xl">

        {/* HEADER */}
        <div className="mb-8 rounded-[2rem] border border-violet-500/10 bg-gradient-to-br from-purple-950 via-violet-950 to-slate-950/90 p-6 shadow-[0_35px_120px_-60px_rgba(79,70,229,0.35)] backdrop-blur-xl ring-1 ring-white/5">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300 text-center">Following</p>
          <h2 className="mt-3 text-4xl font-semibold text-white text-center">
            👤 Who You Follow
          </h2>
          <p className="mt-3 text-center text-slate-400">Stay updated with the people you follow</p>
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {followings.map((user) => (
            <div
              key={user.id}
              className="group flex items-center gap-4 overflow-hidden rounded-[2rem] border border-violet-500/15 bg-gradient-to-br from-slate-950/95 via-violet-950/90 to-purple-950/95 p-4 shadow-[0_25px_70px_-40px_rgba(124,58,237,0.8)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(124,58,237,0.35)]"
            >

              {/* AVATAR */}
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-violet-400/20 shadow-lg shadow-violet-500/20"
              />

              {/* INFO */}
              <div className="flex-1">
                <p className="text-white font-semibold text-lg group-hover:text-violet-100 transition">
                  {user.name}
                </p>
                <p className="text-violet-300 text-sm">
                  @{user.username}
                </p>
              </div>

              {/* BUTTON */}
              <button className="rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-200 hover:scale-105 hover:brightness-110">
                Following
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};