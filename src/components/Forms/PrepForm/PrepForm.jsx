import React from "react";
import TextArea from "../TexrAreaGroup/TextAreaGroup";
import "./PrepForm.css";

function PrepForm({
  formData = {
    point: "hoge",
    reason: "moge",
    example: "hoge",
    pointSummary: "moge",
  },
  handleInputChange,
}) {
  return (
    <div>
      {/* フォーム入力セクション*/}
      <section className="form-input-section">
        <TextArea
          title="Point(主張)"
          name="point"
          value={formData.point}
          handleInputChange={handleInputChange}
          placeholder="あなたの主張や結論を書いてください"
          rows="3"
        />

        <TextArea
          title="Reason (理由)"
          name="reason"
          value={formData.reason}
          handleInputChange={handleInputChange}
          placeholder="主張の理由や根拠を書いてください"
          rows="3"
        />

        <TextArea
          title="Example (具体例)"
          name="example"
          value={formData.example}
          handleInputChange={handleInputChange}
          placeholder="具体例や説明例を書いてください"
          rows="3"
        />

        <TextArea
          title="Point (まとめ)"
          name="pointSummary"
          value={formData.pointSummary}
          handleInputChange={handleInputChange}
          placeholder="もう一度主張を強調し、まとめてください"
          rows="3"
        />
      </section>

      {/* 入力内容プレビューセクション*/}
      <section className="preview-section">
        <h3>プレビュー</h3>
        <div className="preview-content">
          {formData.point && (
            <div className="preview-item">
              <div className="preview-label">[主張]</div>
              <div className="preview-text">{formData.point}</div>
            </div>
          )}

          {formData.reason && (
            <div className="preview-item">
              <div className="preview-label">[理由]</div>
              <div className="preview-text">{formData.reason}</div>
            </div>
          )}

          {formData.example && (
            <div className="preview-item">
              <div className="preview-label">[具体例]</div>
              <div className="preview-text">{formData.example}</div>
            </div>
          )}

          {formData.pointSummary && (
            <div className="preview-item">
              <div className="preview-label">[まとめ]</div>
              <div className="preview-text">{formData.pointSummary}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PrepForm;
