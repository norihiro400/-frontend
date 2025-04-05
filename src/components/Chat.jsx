import { useEffect, useRef, useState } from "react";
import BaseForm from "./Forms/BaseForm/BaseForm";
import ContentEvaluation from "./ContentEvaluation/ContentEvaluation";

const questions = [
  "整理したい思考のジャンルを教えてください(悩み、気づき)",
  "具体的な対象を教えてください。例えば、「プログラミング学習」,「部活動」,「バイト」など",
  "最終的な目標を教えてください(どういう言語化をしたいですか?)",
];

export default function Chat() {

  // 本アプリケーションの3step：
  // チャットでの質問回答(整理)　⇒　フォーム入力(フレームワークの力を借りてアウトプット) ⇒　自分の言語化を評価
  // ('questions', 'form', 'evaluation'）
  const [currentScreen, setCurrentScreen] = useState('questions');

  // 質問フェーズの状態群
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { role: "bot", text: questions[0] }
  ]);
  const bottomRef = useRef(null);

  //フォーム入力によって生成された文章を格納する状態
  const [generatedContent, setGeneratedContent] = useState("");


  // 初期ロード時にAPIから質問を取得
  useEffect(() => {
    // APIから質問を取得する処理
    // 実装されたらここにコードを追加
  }, []);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newLog = [...chatLog, { role: "user", text: input }];


    if (step + 1 < questions.length) {
      // まだ質問が残っている場合
      newLog.push({ role: "bot", text: questions[step + 1] });
      setChatLog(newLog);
      setInput("");
      setStep((prev) => prev + 1);
    } else {
      // 全質問が終わったら言語化フォームを表示
      setChatLog(newLog);
      setInput("");
      setStep((prev) => prev + 1);
      setCurrentScreen('form');
    }
  };

    // 生成された文章を受け取るコールバック
    const handleContentSubmit = (content, type) => {
      // フォームで生成した言語化文章をチャットで表示するために受け取る
      setGeneratedContent(content);
      // アプリのステップを言語化⇒言語化の自己評価に進める
      setCurrentScreen('evaluation');
      
      // 生成された文章をチャットログに追加
      setChatLog([
        ...chatLog,
        { role: "bot", text: "以下の文章を作成しました："},
        { role: "bot", text: content }
      ]);
    };



    // 言語化の自己評価
    const handleEvaluation = (continueProcess, evaluationData) => {
      if (continueProcess) {
        // 続ける場合、新しい質問を取得または設定
        fetchNextQuestions(evaluationData);
      } else {
        // 終了する場合、すべてをリセット
        resetChat();
      }
    };
  
    // 次の質問を取得
    const fetchNextQuestions = (evaluationData) => {
      // APIから次の質問を取得する処理（実際の実装時にここを置き換え）
      const newQuestions = [
        "作成した文章について、もう少し具体的に説明できる部分はありますか？",
        "別の視点から考えると、どのような側面が見えてきますか？",
        "この文章をさらに発展させるとしたら、どのような内容を追加したいですか？"
      ];
      
      setStep(0);
      setCurrentScreen('questions');
      
      // 新しい質問をチャットログに追加
      setChatLog([
        ...chatLog,
        { role: "you", text: "文章の作成お疲れ様でした。さらに深めていくため続けて質問を行います。" },
        { role: "you", text: newQuestions[0] }
      ]);
    };
  
    // チャットをリセット
    const resetChat = () => {
      setCurrentScreen('questions');
      setStep(0);
      setInput("");
      setChatLog([{ role: "bot", text: questions[0] }]);
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


      {/* 
      これ以降の実装
      実装①:アプリからの質問に回答しきったら(step === questions.length)ユーザー自身で言語化(<BaseForm/>)　⇒　
      実装②言語化した文章をユーザーは[目的に沿っているか？][適切な表現か？]などを客観的に分析し言語化を続けるかどうかを選択　⇒
      実装③続ける場合は再びアプリからの質問に回答していく、続けない場合はチャット内容をすべてリセット
      */}


      {/* ①言語化フォームフェーズ */}
      {currentScreen === 'form' && (
        <BaseForm onSubmitContent={handleContentSubmit} />
      )}

      {/* ②自身の言語化の評価・分析フェーズ */}
      {currentScreen === 'evaluation' && (
        <ContentEvaluation
          content={generatedContent}
          onEvaluate={handleEvaluation} 
        />
      )}
    </div>
  );
}
