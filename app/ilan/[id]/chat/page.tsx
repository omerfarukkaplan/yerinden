"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";

export default function ChatPage({ params }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", params.id)
        .order("created_at");

      setMessages(data || []);
    };

    loadMessages();

    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!content) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("messages").insert({
      conversation_id: params.id,
      sender_id: user?.id,
      content,
    });

    setContent("");
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <div className="bg-white p-6 h-96 overflow-y-auto shadow mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}