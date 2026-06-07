import { useEffect, useState } from "react";

export const Posts = () => {
  const posts = [
    {
      id: 1,
      user: "Anna Smith",
      username: "anna_s",
      avatar: "https://i.pravatar.cc/100?img=1",
      content: "Just finished building my new React project 🚀 Feeling great!",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      user: "John Doe",
      username: "john_d",
      avatar: "https://i.pravatar.cc/100?img=2",
      content: "Learning TypeScript is actually fun 😄",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      user: "Lily Brown",
      username: "lily_b",
      avatar: "https://i.pravatar.cc/100?img=3",
      content: "Coffee + coding = perfect day ☕💻",
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop",
    },
  ];

  // ❤️ LIKE STATE (persisted)
  const [liked, setLiked] = useState<{ [key: number]: boolean }>(() => {
    return JSON.parse(localStorage.getItem("liked") || "{}");
  });

  const [likes, setLikes] = useState<{ [key: number]: number }>(() => {
    return JSON.parse(localStorage.getItem("likes") || "{}");
  });

  // 💬 COMMENTS STATE (persisted)
  const [comments, setComments] = useState<{ [key: number]: string[] }>(() => {
    return JSON.parse(localStorage.getItem("comments") || "{}");
  });

  const [text, setText] = useState<{ [key: number]: string }>({});

  // 💾 sync storage
  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // ❤️ LIKE TOGGLE
  const handleLike = (id: number) => {
    setLiked((prev) => {
      const isLiked = !prev[id];

      const newLiked = {
        ...prev,
        [id]: isLiked,
      };

      setLikes((lprev) => {
        const newLikes = {
          ...lprev,
          [id]: isLiked
            ? (lprev[id] || 0) + 1
            : Math.max((lprev[id] || 1) - 1, 0),
        };

        return newLikes;
      });

      return newLiked;
    });
  };

  // 💬 ADD COMMENT
  const addComment = (id: number) => {
    if (!text[id]) return;

    const updated = {
      ...comments,
      [id]: [...(comments[id] || []), text[id]],
    };

    setComments(updated);
    setText((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-950 to-slate-950 px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-5">

        {/* HEADER */}
        <div className="rounded-[2rem] border border-violet-500/10 bg-violet-950/40 p-6 text-center">
          <h2 className="text-white text-3xl font-semibold">
            📝 Explore Posts
          </h2>
          <p className="text-slate-400 mt-2">
            Community feed
          </p>
        </div>

        {/* POSTS */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-[2rem] border border-violet-500/15 bg-violet-950/30 p-6"
          >
            {/* USER */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={post.avatar}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="text-white font-semibold">{post.user}</p>
                <p className="text-violet-300 text-sm">
                  @{post.username}
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <p className="text-slate-200 mb-4">
              {post.content}
            </p>

            {/* IMAGE */}
            {post.image && (
              <img
                src={post.image}
                className="w-full rounded-xl mb-4"
              />
            )}

            {/* ACTIONS */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex-1 py-2 rounded-lg transition ${
                  liked[post.id]
                    ? "bg-red-500/20 text-red-300"
                    : "bg-white/5 text-slate-300"
                }`}
              >
                ❤️ Like {likes[post.id] || 0}
              </button>

              <button className="flex-1 bg-white/5 py-2 rounded-lg text-slate-300">
                💬 Comment
              </button>

              <button className="flex-1 bg-white/5 py-2 rounded-lg text-slate-300">
                🔁 Share
              </button>
            </div>

            {/* COMMENT INPUT */}
            <input
              value={text[post.id] || ""}
              onChange={(e) =>
                setText((prev) => ({
                  ...prev,
                  [post.id]: e.target.value,
                }))
              }
              placeholder="Write a comment..."
              className="w-full p-2 rounded-lg bg-white/5 text-white"
            />

            <button
              onClick={() => addComment(post.id)}
              className="mt-2 px-3 py-1 bg-violet-600 text-white rounded-lg"
            >
              Add Comment
            </button>

            {/* COMMENTS LIST */}
            <div className="mt-3 space-y-1">
              {(comments[post.id] || []).map((c, i) => (
                <p key={i} className="text-sm text-slate-300">
                  💬 {c}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};