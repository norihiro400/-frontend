import { useEffect, useRef, useState } from "react";
import BaseForm from "./Forms/BaseForm/BaseForm";
import ContentEvaluation from "./ContentEvaluation/ContentEvaluation";
import { getQuestionByGemini, postAnswerToGemini } from "../api";
import { getEvaluate } from "../api/geminiFetcher";
import "./Chat.css";
const initialQuestions = [
  "整理したい思考のジャンルを教えてください(悩み、気づき)",
  "具体的な対象を教えてください。例えば、「プログラミング学習」,「部活動」,「バイト」など",
  "最終的な目標を教えてください(どういう言語化をしたいですか?)",
];

export default function Chat() {
  const [currentScreen, setCurrentScreen] = useState("questions");
  const [questions, setQuestions] = useState(initialQuestions);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [conti,setConti] = useState(true);
  const [chatLog, setChatLog] = useState([
    { role: "model", parts: [questions[0]] }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const getquestion = async (history) => {
    try {
      const data = await getQuestionByGemini(history);
      return data;
    } catch (error) {
      console.log("質問取得に失敗", error);
      return null;
    }
  };

  const getreaction = async (item) => {
    try {
      const data = await postAnswerToGemini(item);
      return data;
    } catch (error) {
      console.log("質問の取得に失敗しました", error);
      return null;
    }
  };

  const getevaluate = async (history, sentence, evaluate_type) => {
    try {
      const data = await getEvaluate(history, sentence, evaluate_type);
      return data;
    } catch (error) {
      console.log("評価の取得に失敗しました", error);
      return null;
    }
  };



  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", parts: [input] };
    setChatLog([...chatLog,userMessage]);
    const newLog = [...chatLog, userMessage];
    setInput("");
    let updatedLog = [...newLog];
    const nextStep = step + 1;

    if (step === 2) {
      newLog.push({        
        "role": "user",
        "parts": [
            "あなた は、ユーザーの思考の整理・言語化・ブラッシュアップのサポートをするAIです。\nユーザーがより良い体験ができることを最優先に考えて生成してください。\n注意事項は下記のとおりです。\n- 対話はすべて日本語で行ってください。\n- 質問は1度にたくさんせず、1回に1つとしてください。\n- 返答は簡潔にしてください。"
        ],
    })
      const question = await getquestion(newLog);
      if (question?.response) {
        updatedLog.push({ role: "model", parts: [question.response] });
      }
    }
    
    if (step > 2 && step < 8) {
      const item = {
        history: newLog,
        question: newLog[newLog.length - 2].parts[0],
        answer: newLog[newLog.length - 1].parts[0],
      };
      const reaction = await getreaction(item);
      if (reaction?.response) {
        updatedLog.push({ role: "model", parts: [reaction.response] });
      }
    }

    if (nextStep < questions.length) {
      updatedLog.push({ role: "model", parts: [questions[nextStep]] });
    }

        // 「はい/いいえ」の応答処理
    if (step === 8) {
      setCurrentScreen("form");
    }


    setChatLog(updatedLog);
    setStep(nextStep);

    if (conti === false) {
      setCurrentScreen("form");
    }
  };

  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedEvaluation, setGeneratedEvaluation] = useState("");

  const handleContentSubmit = async(content,axis) => {
    const evaluate = await getevaluate(chatLog,content,[axis || "軸が通っているか"]);
    setGeneratedContent(content);
    setGeneratedEvaluation(evaluate.response);
    setCurrentScreen("evaluation");
    setChatLog([
      ...chatLog,
      { role: "you", parts: ["以下の文章を作成しました："] },
      { role: "you", parts: [content] }
    ]);
  };

  const handleEvaluation = (souldContinue, evaluation) => {
    if (souldContinue) {
      fetchNextQuestions(evaluation);
    } else {
      setChatLog([
        {
          role: "model",
          parts: ["言語化の作成が完了しました。次の言語化に取り組む場合は、改めて以下の質問に答えてください。"]
        },
        { role: "model", parts: [initialQuestions[0]] }
      ]);
      resetChat();
    }
  };

  const fetchNextQuestions = (evaluation) => {
    const newQuestions = ["作成した文章について、もう少し具体的に説明できる部分はありますか？"];
    setQuestions(newQuestions);
    setStep(0);
    setCurrentScreen("questions");
    setChatLog([
      ...chatLog,
      { role: "you", parts: ["以下のように評価しました："] },
      {
        role: "you",
        parts: [
          `目的との合致度${evaluation.isRelevant ? "合致していた" : "合致していなかった"} ,表現の適切さ ${evaluation.isAppropriate ? "適切であった" : "不適切であった"}`
        ]
      },
      { role: "model", parts: ["文章の作成お疲れ様でした。さらに深めていくため続けて質問を行います。"] },
      { role: "model", parts: [newQuestions[0]] }
    ]);
  };

  const resetChat = () => {
    setCurrentScreen("questions");
    setStep(0);
    setInput("");
    setChatLog([{ role: "model", parts: [questions[0]] }]);
    setGeneratedContent("");
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
            justifyContent: msg.role === "model" ? "flex-start" : "flex-end",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              backgroundColor: msg.role === "model" ? "#e6e6ff" : "#ccf2f4",
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
                left: msg.role === "model" ? "0" : "auto",
                right: msg.role === "user" ? "0" : "auto",
                backgroundColor: msg.role === "model" ? "#5c5ca4" : "#099",
                color: "#fff",
                fontSize: "0.75rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "1rem",
                width: "56px",
              }}
            >
              {msg.role === "model" ? "先生" : "あなた"}
            </span>
            {msg.parts[0]}
          </div>
        </div>
      ))}

      <div ref={bottomRef} />

      {currentScreen === "questions" && (
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
              maxWidth: "600px",
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
                outline: "none",
              }}
            />
            <button
              className="formbutton"
              onClick={handleSend}
            >
              送信
            </button>
          </div>
        </div>
      )}

      {currentScreen === "form" && (
        <>
          <p style={{ textAlign: "center", padding: "20px" }}>
            いまの段階で思考を文章にまとめてみましょう
          </p>
          <BaseForm onSubmitContent={handleContentSubmit} />
        </>
      )}

      {currentScreen === "evaluation" && (
        <ContentEvaluation
          content={generatedContent}
          evaluate={generatedEvaluation}
          onEvaluate={handleEvaluation}
        />
      )}
    {console.log("形式確認のため",chatLog)}
    </div>
    
  );
}
