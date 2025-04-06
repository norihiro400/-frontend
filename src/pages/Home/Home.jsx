import React from "react";
import "./Home.css";
import { Navigate, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="chat-container">
        <h1 className="title">思考整理チャット</h1>
        <p className="subtitle">
          対話形式であなたの思考を整理し、明確な言語化をサポートします
        </p>

        <div className="info-box">
          <p className="info-title">このアプリでできること:</p>
          <ul className="feature-list">
            <li>チャット形式で思考のジャンルや対象を明確にする</li>
            <li>対話を通じてキーワードやポイントを整理する</li>
            <li>体験や感情を自然な会話の中で言語化する</li>
            <li>PREPなどを使って構造化された文章を作成する</li>
            <li>作成した文章を評価し改善する</li>
          </ul>
        </div>

        <div className="info-box">
          <p className="info-title">対話の流れ:</p>
          <div className="flow-container">
            <div className="flow-item-container">
              <div className="flow-item">
                <span className="flow-number">1</span>
                <span className="flow-text">思考のジャンルと対象を設定</span>
              </div>
              <div className="flow-item">
                <span className="flow-number">2</span>
                <span className="flow-text">最終的なゴールを明確化</span>
              </div>
            </div>
            <div className="flow-item-container">
              <div className="flow-item">
                <span className="flow-number">3</span>
                <span className="flow-text">キーワード・ポイントの抽出</span>
              </div>
              <div className="flow-item">
                <span className="flow-number">4</span>
                <span className="flow-text">体験・感情の言語化</span>
              </div>
            </div>
            <div className="flow-item-container">
              <div className="flow-item">
                <span className="flow-number">5</span>
                <span className="flow-text">構造化された文章の作成</span>
              </div>
              <div className="flow-item">
                <span className="flow-number">6</span>
                <span className="flow-text">評価と改善</span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="start-button"
          onClick={() => {
            navigate("/chat");
          }}
        >
          チャットを始める
        </button>
      </div>
    </div>
  );
}

export default Home;
