import React from "react";
import TextArea from "../TexrAreaGroup/TextAreaGroup";
import "./FiveWOneHForm.css";

function FiveWOneHForm({
  formData = {
    who: "",
    when: "",
    where: "",
    what: "",
    why: "",
    how: "",
  },
  handleInputChange,
}) {
  return (
    <div>
      {/* フォーム入力セクション*/}
      <section className="form-input-section">
        <TextArea
          title="Who (誰が)"
          name="who"
          value={formData.who}
          handleInputChange={handleInputChange}
          placeholder="行動の主体となる人物や組織を書いてください"
          rows="3"
        />

        <TextArea
          title="When (いつ)"
          name="when"
          value={formData.when}
          handleInputChange={handleInputChange}
          placeholder="時間や時期、日時などを書いてください"
          rows="3"
        />

        <TextArea
          title="Where (どこで)"
          name="where"
          value={formData.where}
          handleInputChange={handleInputChange}
          placeholder="場所や位置、環境などを書いてください"
          rows="3"
        />

        <TextArea
          title="What (何を)"
          name="what"
          value={formData.what}
          handleInputChange={handleInputChange}
          placeholder="行動や出来事の内容を書いてください"
          rows="3"
        />

        <TextArea
          title="Why (なぜ)"
          name="why"
          value={formData.why}
          handleInputChange={handleInputChange}
          placeholder="理由や動機、目的などを書いてください"
          rows="3"
        />

        <TextArea
          title="How (どのように)"
          name="how"
          value={formData.how}
          handleInputChange={handleInputChange}
          placeholder="方法や手段、過程などを書いてください"
          rows="3"
        />
      </section>

      {/* 入力内容プレビューセクション*/}
      <section className="preview-section">
        <h3>プレビュー</h3>
        <div className="preview-content">
          {formData.who && (
            <div className="preview-item">
              <div className="preview-label">[誰が]</div>
              <div className="preview-text">{formData.who}</div>
            </div>
          )}

          {formData.when && (
            <div className="preview-item">
              <div className="preview-label">[いつ]</div>
              <div className="preview-text">{formData.when}</div>
            </div>
          )}

          {formData.where && (
            <div className="preview-item">
              <div className="preview-label">[どこで]</div>
              <div className="preview-text">{formData.where}</div>
            </div>
          )}

          {formData.what && (
            <div className="preview-item">
              <div className="preview-label">[何を]</div>
              <div className="preview-text">{formData.what}</div>
            </div>
          )}

          {formData.why && (
            <div className="preview-item">
              <div className="preview-label">[なぜ]</div>
              <div className="preview-text">{formData.why}</div>
            </div>
          )}

          {formData.how && (
            <div className="preview-item">
              <div className="preview-label">[どのように]</div>
              <div className="preview-text">{formData.how}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default FiveWOneHForm;
