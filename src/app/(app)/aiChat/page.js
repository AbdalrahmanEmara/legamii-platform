"use client";

import { useRef, useState, useEffect } from "react";
import ReusableWindow from "@/components/ui/ReusableWindow";
import Background from "@/components/ui/Background";
import CustomScroll from "@/components/ui/CustomScroll";

// ─── MOCK CHAT HISTORY (sidebar) ─────────────────────────────────────────────
const INITIAL_CHATS = [
  { id: 1, title: "What is the difference be...", messages: [] },
  { id: 2, title: "If we add Carbon Dioxid...", messages: [] },
  {
    id: 3,
    title: "Which part of the cell is...",
    messages: [
      {
        role: "user",
        text: "Coach, can you explain this question to me? \"Which part of the cell is known as the 'Powerhouse'?\"",
      },
      {
        role: "tutor",
        text: "Of course! That's a great question. Let's break down the logic behind this mission objective. What specifically would you like to know about the concepts involved? I can explain the core mechanics or give you a real-world example!",
      },
    ],
  },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
function SendIcon() {
  return (
    <div
      data-property-1="Icon only"
      style={{
        width: "100%",
        height: "100%",
        padding: 8,
        background: "var(--Primary-500, #D865E0)",
        boxShadow: "2px 3px 4px black",
        overflow: "hidden",
        borderRadius: 4,
        outline: "1px var(--Text, #020203) solid",
        outlineOffset: "-1px",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
      }}
    >
      <div style={{ width: 32, height: 32, position: "relative" }}>
        <img
          style={{ width: 32, height: 32, left: 0, top: 0, position: "absolute" }}
          src="images/image 98.svg"
        />
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ chats, activeChatId, onSelectChat, onNewChat }) {
  return (
    <aside className="flex w-[220px] flex-shrink-0 flex-col items-stretch border-r border-[#262626]">
      {/* Header */}
      <div className="py-xs2 px-base gap-sm flex items-center items-stretch justify-center border-b border-[#262626] text-center">
        <span className="heading-h6-primary text-text tracking-widest">Chats</span>
      </div>

      {/* Tree list */}
      <div className="px-base py-xs2 gap-xs2 flex flex-1 flex-col overflow-y-auto">
        {/* New Chat */}
        <button
          onClick={onNewChat}
          className="hover:bg-primary-50 mb-1 flex cursor-pointer items-center gap-2 rounded border-none bg-transparent px-1 py-1.5 text-left transition-colors"
        >
          <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border border-gray-500 font-mono text-xs text-gray-600">
            +
          </span>
          <span className="label-1 text-text font-medium">New Chat</span>
        </button>

        {/* Chat items with tree lines */}
        <div className="relative ml-2 flex flex-col">
          {/* Vertical line connecting all items */}
          <div className="absolute top-0 left-0 h-full w-px bg-gray-400" />

          {chats.map((chat, i) => {
            const isActive = activeChatId === chat.id;
            const isLast = i === chats.length - 1;
            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className="group relative flex cursor-pointer items-center border-none bg-transparent px-0 py-1.5 text-left transition-colors hover:bg-transparent"
              >
                {/* Horizontal connector line */}
                <span className="mr-1.5 flex-shrink-0 font-mono text-sm text-gray-400">
                  {isLast ? "└" : "─"}
                </span>
                <span
                  className={`body-2 transition-colors ${
                    isActive
                      ? "text-text font-medium"
                      : "font-medium text-gray-400 group-hover:text-gray-700"
                  }`}
                >
                  {chat.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
// ─── MESSAGE BUBBLE ───────────────────────────────────────────────────────────
// ─── MESSAGE BUBBLE — fix the color bug (missing space) and size ──────────────
function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`gap-xs2 flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      {/* Bubble */}
      <div
        className={`p-sm body-2 border-border w-[360px] rounded-md border font-medium shadow-[2px_3px_4px_0_#000] ${
          isUser ? "bg-el-bg" : "bg-primary-50 text-text"
        }`}
      >
        {message.text}
      </div>

      {/* Label below bubble */}
      {isUser ? (
        <span className="body-4 tracking-widest text-gray-400 uppercase">YOU</span>
      ) : (
        <div className="gap-xs2 flex items-center">
          <img className="h-[32px] w-[32px]" src="/images/Robot.png" alt="TUTOR" />
          <span className="body-3 tracking-widest text-gray-400 uppercase">TUTOR</span>
        </div>
      )}
    </div>
  );
}

// ─── CHAT AREA ────────────────────────────────────────────────────────────────
function ChatArea({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    // <CustomScroll>
    <div className="flex flex-col p-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 text-4xl">🤖</div>
          <p className="font-mono text-sm text-gray-400">Ask your tutor anything!</p>
        </div>
      )}
      {messages.map((m, i) => (
        <MessageBubble key={i} message={m} />
      ))}
      {loading && (
        <div className="mb-4 flex flex-col items-start">
          <div className="border-primary-100 bg-primary-100 rounded-xl rounded-bl-sm border px-4 py-3 font-mono text-xs text-gray-400">
            thinking<span className="animate-pulse">...</span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
    // </CustomScroll>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
function AiTutorPage() {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(3);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages ?? [];

  const updateMessages = (chatId, newMessages) => {
    setChats((prev) => prev.map((c) => (c.id === chatId ? { ...c, messages: newMessages } : c)));
  };

  const handleNewChat = () => {
    const newId = Date.now();
    setChats((prev) => [...prev, { id: newId, title: "New Chat", messages: [] }]);
    setActiveChatId(newId);
    setInput("");
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setInput("");
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", text }];
    updateMessages(activeChatId, next);

    // Update sidebar title from the first message
    if (messages.length === 0) {
      setChats((prev) =>
        prev.map((c) => (c.id === activeChatId ? { ...c, title: text.slice(0, 22) + "..." } : c))
      );
    }

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "You are an encouraging science tutor helping students understand concepts. Keep explanations clear, engaging, and use real-world analogies. Address the student as a curious learner on a science mission.",
          messages: next.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      const reply =
        data.content?.map((c) => c.text || "").join("") || "Sorry, I couldn't respond right now!";
      updateMessages(activeChatId, [...next, { role: "tutor", text: reply }]);
    } catch {
      updateMessages(activeChatId, [
        ...next,
        { role: "tutor", text: "Connection error. Please try again!" },
      ]);
    }

    setLoading(false);
  };

  return (
    <Background>
      <div className="flex items-center justify-center p-8">
        <ReusableWindow
          title="AI_TUTOR.SYS"
          className="flex h-[750px] w-[900px] flex-col overflow-hidden"
        >
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
              chats={chats}
              activeChatId={activeChatId}
              onSelectChat={handleSelectChat}
              onNewChat={handleNewChat}
            />

            {/* Main chat panel */}

            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Chat header */}
              <div className="gap-sm px-base py-sm flex items-center border-b border-[#262626]">
                <img className="h-[32px] w-[32px]" src="/images/Robot.png" alt="TUTOR" />
                <span className="heading-h5-primary text-text uppercase">AI TUTOR</span>
              </div>

              {/* Messages — scrollable area only */}
              <div className="flex flex-1 overflow-hidden">
                <CustomScroll>
                  <ChatArea messages={messages} loading={loading} />
                </CustomScroll>
              </div>

              {/* Input — fixed at bottom, outside scroll */}
              <div className="flex items-center gap-3 border-t border-[#262626] px-4 py-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask your tutor anything"
                  className="body-3 bg-el-bg p-sm flex-1 rounded-sm border border-neutral-900 text-gray-700 transition-colors outline-none placeholder:text-gray-300 focus:border-neutral-900"
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className={`bg-primary-500 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none text-white shadow-[2px_2px_0_#7c3aed] transition-opacity ${
                    loading ? "cursor-not-allowed opacity-50" : "hover:opacity-90"
                  }`}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        </ReusableWindow>
      </div>
    </Background>
  );
}

export default AiTutorPage;
