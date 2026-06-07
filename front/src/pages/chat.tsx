import { useEffect, useState } from "react";
import {
  createOrGetDM,
  getMessages,
  sendMessage,
  markAsRead,
} from "../config/api";

export const Chat = ({ partnerId }: { partnerId: number }) => {
  const [chat, setChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const load = async () => {
      const c = await createOrGetDM(partnerId);
      setChat(c);

      const msgs = await getMessages(c.id);
      setMessages(msgs);

      await markAsRead(c.id);
    };

    load();
  }, [partnerId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const msg = await sendMessage(chat.id, text);
    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="mb-4">💬 Chat</h2>

      <div className="space-y-2 mb-4">
        {messages.map((m) => (
          <div key={m.id} className="bg-white/10 p-2 rounded">
            <b>{m.sender?.username}:</b> {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 bg-white/10 rounded"
          placeholder="Write message..."
        />

        <button
          onClick={handleSend}
          className="px-4 bg-violet-600 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};