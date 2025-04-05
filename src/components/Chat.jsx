import { useEffect, useRef, useState } from "react";

const questions = [
  "整理したい思考のジャンルを教えてください？",
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
        width: "80%",
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        paddingBottom: "6rem" 
      }}
    >
      {chatLog.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: msg.role === "bot" ? "flex-start" : "flex-end",
            marginBottom: "0.5rem",
          }}
        >
          <p
            style={{
              backgroundColor: msg.role === "bot" ? "#f0f0f0" : "#d1e7dd",
              padding: "0.75rem 1rem",
              borderRadius: "1rem",
              maxWidth: "70%",
              display: "inline-block",
              wordBreak: "break-word",
            }}
          >
            <strong>{msg.role === "bot" ? "Bot" : "You"}:</strong> {msg.text}
          </p>
        </div>
      ))}

        {step === questions.length && (
        <div style={{padding:60}}>
            <p>思考を整理する</p>
        </div>
        )}

      <div ref={bottomRef}/>


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
              style={{
                flex: 1,
                padding: "0.5rem",
                fontSize: "1rem"
              }}
            />
            <button onClick={handleSend}>送信</button>
          </div>
        </div>
      )}

    </div>
  );
}
