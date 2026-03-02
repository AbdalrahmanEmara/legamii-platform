// import { useEffect, useRef, useState } from "react";
// import ReusableWindow from "../ReusableWindow";

// function AiTutorModal({ question, onClose }) {
//   const [messages, setMessages] = useState([
//     { role: "user", text: `Coach, can you explain this question to me? "${question.text}"` },
//     {
//       role: "tutor",
//       text: `Of course! That's a great question. Let's break down the logic behind this mission objective. ${question.tip} Would you like to know more about the concepts involved? I can explain the core mechanics or give you a real-world example!`,
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const bottomRef = useRef(null);

//   useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//   const send = async () => {
//     const text = input.trim();
//     if (!text || loading) return;
//     const next = [...messages, { role: "user", text }];
//     setMessages(next);
//     setInput("");
//     setLoading(true);
//     try {
//       const res = await fetch("https://api.anthropic.com/v1/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "claude-sonnet-4-20250514",
//           max_tokens: 1000,
//           system: `You are an encouraging science tutor helping a student understand quiz questions. The current question is: "${question.text}". The correct answer is: "${question.options[question.correct]}". Keep explanations clear, engaging, use analogies. Address the student as a curious learner on a science mission.`,
//           messages: next.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
//         }),
//       });
//       const data = await res.json();
//       const reply = data.content?.map((c) => c.text || "").join("") || "Sorry, I couldn't respond right now!";
//       setMessages((prev) => [...prev, { role: "tutor", text: reply }]);
//     } catch {
//       setMessages((prev) => [...prev, { role: "tutor", text: "Connection error. Try again!" }]);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
//       <ReusableWindow title="AI_TUTOR.SYS" className="w-full max-w-lg shadow-[6px_6px_0_#1e1b4b]">
//         <div className="flex flex-col" style={{ height: 460 }}>
//           {/* Header */}
//           <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-lg bg-purple-50 border-2 border-purple-100 flex items-center justify-center text-lg">🤖</div>
//               <span className="font-mono font-bold text-base text-gray-900 tracking-widest uppercase">AI TUTOR</span>
//             </div>
//             <button
//               onClick={onClose}
//               className="font-mono text-xs px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer text-gray-600 transition-colors"
//             >
//               Go To Chat
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
//             {messages.map((m, i) => (
//               <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
//                 <div className={`max-w-[82%] font-mono text-xs leading-relaxed px-3.5 py-2.5 border-2 ${m.role === "user"
//                     ? "bg-white border-gray-200 rounded-xl rounded-br-sm shadow-[2px_2px_0_#e5e7eb] text-gray-700"
//                     : "bg-purple-50 border-purple-100 rounded-xl rounded-bl-sm shadow-[2px_2px_0_#e0d7ff] text-gray-700"
//                   }`}>
//                   {m.text}
//                 </div>
//                 <span className="font-mono text-[10px] text-gray-400 mt-1 tracking-widest uppercase">
//                   {m.role === "user" ? "YOU" : "TUTOR"}
//                 </span>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex flex-col items-start">
//                 <div className="bg-purple-50 border-2 border-purple-100 rounded-xl rounded-bl-sm px-3.5 py-2.5 font-mono text-xs text-gray-400">
//                   thinking<span className="animate-pulse">...</span>
//                 </div>
//               </div>
//             )}
//             <div ref={bottomRef} />
//           </div>

//           {/* Input */}
//           <div className="px-4 py-3 border-t-2 border-gray-100 flex gap-2">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               placeholder="Ask your tutor anything"
//               className="flex-1 font-mono text-xs px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-purple-300 text-gray-700 placeholder-gray-300 transition-colors"
//             />
//             <button
//               onClick={send}
//               disabled={loading}
//               className={`w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_#7c3aed] transition-opacity border-none ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90"}`}
//             >
//               <span className="text-white text-sm">✈</span>
//             </button>
//           </div>
//         </div>
//       </ReusableWindow>
//     </div>
//   );
// }

// export default AiTutorModal;

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ReusableWindow from "../ReusableWindow";

function AiTutorModal({ question, onClose }) {
  const router = useRouter();

  const [messages, setMessages] = useState([
    {
      role: "user",
      text: `Coach, can you explain this question to me?\n"${question.text}"`,
    },
    {
      role: "tutor",
      text: `Of course! That's a great question.\n\n${question.tip}\n\nWould you like me to break it down further or give you a real-world example?`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: `You are an encouraging science tutor helping a student understand quiz questions.
The current question is: "${question.text}".
The correct answer is: "${question.options[question.correct]}".

Explain clearly, use simple language, short paragraphs, and analogies.`,
          messages: next.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const reply =
        data.content?.map((c) => c.text || "").join("") ||
        "Sorry, I couldn't respond right now!";

      setMessages((prev) => [...prev, { role: "tutor", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "tutor", text: "Connection error. Try again!" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
   <ReusableWindow
  title="AI_TUTOR.SYS"
  className="w-[600px] max-w-[95vw] shadow-[6px_6px_0_#1e1b4b]"
>
        <div className="flex flex-col h-[500px]">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤖</span>
              <span className="font-mono font-bold tracking-widest uppercase">
                AI Tutor
              </span>
            </div>

            <button
              onClick={() => router.push("/AI-chat")}
              className="border border-black bg-white px-4 py-1.5 font-mono text-xs shadow-[3px_3px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Go To Chat
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#F3F3F3]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[75%] whitespace-pre-line border border-black px-4 py-3 font-mono text-sm shadow-[3px_3px_0_#000] ${
                    m.role === "user"
                      ? "bg-white"
                      : "bg-[#E6DAEC]"
                  }`}
                >
                  {m.text}
                </div>

                <span className="mt-1 text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                  {m.role === "user" ? "YOU" : "TUTOR"}
                </span>
              </div>
            ))}

            {loading && (
              <div className="font-mono text-xs text-gray-400">
                thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="flex gap-3 p-4 border-t border-black bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask your tutor anything"
              className="flex-1 border border-black px-3 py-2 font-mono text-sm outline-none"
            />

            <button
              onClick={send}
              disabled={loading}
              className="px-4 border border-black bg-purple-400 font-mono text-white shadow-[3px_3px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              ➤
            </button>
          </div>
        </div>
      </ReusableWindow>
    </div>
  );
}

export default AiTutorModal;