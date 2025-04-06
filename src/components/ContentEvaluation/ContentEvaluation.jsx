import React, { useState } from "react";
import "./ContentEvaluation.css";

const ContentEvaluation = ({ content, onEvaluate }) => {
  const [evaluation, setEvaluation] = useState({
    isRelevant: null,
    isAppropriate: null,
    comments: "",
  });

  const handleOptionChange = (field, value) => {
    setEvaluation({
      ...evaluation,
      [field]: value,
    });
  };

  const handleCommentsChange = (e) => {
    setEvaluation({
      ...evaluation,
      comments: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 評価が未完了の場合、警告
    if (evaluation.isRelevant === null || evaluation.isAppropriate === null) {
      window.alert("すべての評価項目を選択してください。");
      return;
    }

    // 続けるかどうかを決定
    // 「目的に沿っていない」または「表現が適切ではない」場合続行
    const shouldContinue =
      evaluation.isRelevant === false || evaluation.isAppropriate === false;

    // 評価結果を親コンポーネントに渡す
    onEvaluate(shouldContinue, evaluation);
  };

  return (
    <div className="evaluation-container">
      <h2 className="evaluation-title">文章の評価</h2>

      <div className="content-display">
        <h3>生成された文章</h3>
        <div className="content-box">{content}</div>
      </div>

      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="evaluation-item">
          <h3>1. この文章は目的に沿っていますか？</h3>
          <div className="option-group">
            <label className="option">
              <input
                type="radio"
                name="isRelevant"
                checked={evaluation.isRelevant === true}
                onChange={() => handleOptionChange("isRelevant", true)}
              />
              はい、目的に沿っています
            </label>
            <label className="option">
              <input
                type="radio"
                name="isRelevant"
                checked={evaluation.isRelevant === false}
                onChange={() => handleOptionChange("isRelevant", false)}
              />
              いいえ、目的に沿っていません
            </label>
          </div>
        </div>

        <div className="evaluation-item">
          <h3>2. 表現は適切ですか？</h3>
          <div className="option-group">
            <label className="option">
              <input
                type="radio"
                name="isAppropriate"
                checked={evaluation.isAppropriate === true}
                onChange={() => handleOptionChange("isAppropriate", true)}
              />
              はい、適切です
            </label>
            <label className="option">
              <input
                type="radio"
                name="isAppropriate"
                checked={evaluation.isAppropriate === false}
                onChange={() => handleOptionChange("isAppropriate", false)}
              />
              いいえ、改善が必要です
            </label>
          </div>
        </div>

        <div className="evaluation-item">
          <h3>3. コメント (任意)</h3>
          <textarea
            className="comment-input"
            value={evaluation.comments}
            onChange={handleCommentsChange}
            placeholder="この文章についてのコメントやフィードバックがあれば入力してください。"
            rows="4"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">
            評価を完了して続ける
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentEvaluation;
