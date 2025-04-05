import { useEffect, useRef, useState } from "react";

const questions = [
  "整理したい思考のジャンルを教えてください(悩み、気づき)",
  "具体的な対象を教えてください。例えば、「プログラミング学習」,「部活動」,「バイト」など",
  "最終的な目標を教えてください(どういう言語化をしたいですか?)",
];

export default function Chat() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { role: "bot", text: questions[0] }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newLog = [...chatLog, { role: "user", text: input }];

    if (step + 1 < questions.length) {
      newLog.push({ role: "bot", text: questions[step + 1] });
    }

    setChatLog(newLog);
    setInput("");
    setStep((prev) => prev + 1);
  };

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        paddingBottom: "7rem",
        fontFamily: "sans-serif",
      }}
    >
      {chatLog.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: msg.role === "bot" ? "flex-start" : "flex-end",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              backgroundColor: msg.role === "bot" ? "#e6e6ff" : "#ccf2f4",
              padding: "0.85rem 1.2rem",
              borderRadius: "1rem",
              maxWidth: "75%",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              wordBreak: "break-word",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-1.1rem",
                left: msg.role === "bot" ? "0" : "auto",
                right: msg.role === "user" ? "0" : "auto",
                backgroundColor: msg.role === "bot" ? "#5c5ca4" : "#099",
                color: "#fff",
                fontSize: "0.75rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "1rem",
              }}
            >
              {msg.role === "bot" ? "Bot" : "You"}
            </span>
            {msg.text}
          </div>
        </div>
      ))}

      {step === questions.length && (
        <div style={{ padding: 60 }}>
          <p style={{ textAlign: "center", fontWeight: "bold" }}> 思考をまとめる</p>
        </div>
      )}

      <div ref={bottomRef} />

      {step < questions.length && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: "1rem 2rem",
            borderTop: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              maxWidth: "600px"
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="入力してください..."
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none"
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: "0.75rem 1.2rem",
                fontSize: "1rem",
                backgroundColor: "#5c5ca4",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              送信
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
