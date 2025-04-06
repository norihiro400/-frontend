import React, { useState } from "react";
import "./BaseForm.css";
import Tabs from "../../Tabs/Tabs";
import PrepForm from "../PrepForm/PrepForm";
import FreeForm from "../FreeForm/FreeForm";
import FiveWOneHForm from "../FiveWOneHForm/FiveWOneHForm";
import ErrorSolvingForm from "../ErrorSolvingForm/ErrorResolvingForm";

// タブの設定を一元管理 - 拡張しやすいオブジェクト構造に
const FORM_TYPES = {
  PREP: "prep",
  FIVE_W_ONE_H: "5W1H",
  FREE: "free",
  ERROR_SOLVING: "errorSolving",
};

// タブ設定（UI表示用）
const tabConfig = [
  { id: FORM_TYPES.PREP, label: "PREPで作成" },
  { id: FORM_TYPES.FIVE_W_ONE_H, label: "5W1Hで作成" },
  { id: FORM_TYPES.FREE, label: "自由に作成" },
  { id: FORM_TYPES.ERROR_SOLVING, label: "エラー解決プロセス" },
];

const BaseForm = ({ onSubmitContent }) => {
  // タブの状態管理
  const [activeTab, setActiveTab] = useState(tabConfig[0].id);

  // タブ切り替えのハンドラ
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 各フォームタイプの初期状態を一元管理
  const initialFormStates = {
    // PREP用初期状態
    [FORM_TYPES.PREP]: {
      point: "",
      reason: "",
      example: "",
      pointSummary: "",
    },
    // 自由記述用初期状態
    [FORM_TYPES.FREE]: {
      content: "",
      evaluationaxis:""
    },
    // 5W1H用初期状態
    [FORM_TYPES.FIVE_W_ONE_H]: {
      who: "",
      when: "",
      why: "",
      what: "",
      where: "",
      how: "",
    },
    // エラー解決テンプレート用初期状態
    [FORM_TYPES.ERROR_SOLVING]: {
      problem: "",
      errorMessage: "",
      possibleCauses: "",
      attemptedSolutions: "",
      finalSolution: "",
      learnings: "",
    },
  };

  // 一つの状態に全フォームタイプの状態が格納されている
  const [formState, setFormState] = useState(initialFormStates);

  // 入力変更の汎用ハンドラ
  const handleInputChange = (formType) => (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [formType]: {
        ...formState[formType],
        [name]: value,
      },
    });
  };

  // キャンセルボタンのハンドラ
  const handleCancel = () => {
    setFormState({
      ...formState,
      [activeTab]: initialFormStates[activeTab],
    });
  };

  // フォームが入力されているかチェックする関数
  const hasFormInput = (formType, formData) => {
    switch (formType) {
      case FORM_TYPES.PREP:
        return (
          formData.point.trim() !== "" &&
          formData.reason.trim() !== "" &&
          formData.example.trim() !== "" &&
          formData.pointSummary.trim() !== ""
        );

      case FORM_TYPES.FIVE_W_ONE_H:
        return (
          formData.who.trim() !== "" ||
          formData.when.trim() !== "" ||
          formData.where.trim() !== "" ||
          formData.what.trim() !== "" ||
          formData.why.trim() !== "" ||
          formData.how.trim() !== ""
        );

      case FORM_TYPES.FREE:
        return formData.content.trim() !== "";

      case FORM_TYPES.ERROR_SOLVING:
        return (
          formData.problem.trim() !== "" &&
          formData.errorMessage.trim() !== "" &&
          formData.possibleCauses.trim() !== "" &&
          formData.attemptedSolutions.trim() !== "" &&
          formData.finalSolution.trim() !== "" &&
          formData.learnings.trim() !== ""
        );

      default:
        return false;
    }
  };

  // 各フォーム形式から文章を生成する関数。
  const generateUnifiedText = (formType, formData) => {
    // 入力がない場合は空文字を返す
    if (!hasFormInput(formType, formData)) {
      return "";
    }

    switch (formType) {
      // 最終的にバックエンドに送信する文章(PREP)
      case FORM_TYPES.PREP:
        return `${formData.point}が重要なポイントです。なぜなら、${formData.reason}だからです。具体的な例を挙げると、${formData.example}といったことが挙げられます。このことから、${formData.pointSummary}というのが私の考えです。`;

      // 最終的にバックエンドに送信する文章(5W1H)
      case FORM_TYPES.FIVE_W_ONE_H:
        let text = "";

        if (formData.who) text += `${formData.who}が`;
        if (formData.when) text += `${formData.when}に`;
        if (formData.where) text += `${formData.where}で`;
        if (formData.what) text += `${formData.what}を`;
        if (formData.why) text += `${formData.why}という理由から`;
        if (formData.how) text += `${formData.how}という方法で`;
        // 末尾の処理
        if (text.length > 0) {
          text += "行いました。";
        }
        return text;

      // 最終的にバックエンドに送信する文章(自由記入)
      case FORM_TYPES.FREE:
        return formData.content;

      // 最終的にバックエンドに送信する文章(エラー解決)
      case FORM_TYPES.ERROR_SOLVING:
        return `今回${formData.problem}という問題に遭遇しました。エラーメッセージは次のようになっていました。${formData.errorMessage}。
        私はこのエラーの原因は${formData.possibleCauses}ではないかという仮説を立て、${formData.attemptedSolutions}という解決策を試しました。
        最終的な解決策としては${formData.finalSolution}のようなことを行いました。学びと今後の対策としては${formData.learnings}という教訓を得ました。`;

      default:
        return "";
    }
  };

  // 選択中のタブに合わせたタブをコンポーネントを返す関数
  const renderActiveForm = () => {
    const currentFormData = formState[activeTab];

    switch (activeTab) {
      case FORM_TYPES.PREP:
        return (
          <PrepForm
            handleInputChange={handleInputChange(FORM_TYPES.PREP)}
            formData={currentFormData}
          />
        );
      case FORM_TYPES.FIVE_W_ONE_H:
        return (
          <FiveWOneHForm
            handleInputChange={handleInputChange(FORM_TYPES.FIVE_W_ONE_H)}
            formData={currentFormData}
          />
        );
      case FORM_TYPES.FREE:
        return (
          <FreeForm
            handleInputChange={handleInputChange(FORM_TYPES.FREE)}
            formData={currentFormData}
          />
        );

      case FORM_TYPES.ERROR_SOLVING:
        return (
          <ErrorSolvingForm
            handleInputChange={handleInputChange(FORM_TYPES.ERROR_SOLVING)}
            formData={currentFormData}
          />
        );

      default:
        return null;
    }
  };

  // **************重要！！！！**************************:
  // フォーム送信のハンドラ
  const handleSubmit = (e) => {
    e.preventDefault();

    // 入力が不十分な場合、エラーアラートを表示して送信を中止
    if (!hasFormInput(activeTab, formState[activeTab])) {
      window.alert(
        "必要な項目が入力されていません。すべての項目を入力してください。"
      );
      return;
    }

    // フォームデータを文章化
    const generatedText = generateUnifiedText(activeTab, formState[activeTab]);

    // チャットコンポーネントに伝える
    onSubmitContent(generatedText,formState[activeTab].evaluationaxis || "");
  };

  return (
    <div className="base-form-container">
      <h2 className="form-title">文章を作成する</h2>

      {/* タブ切り替え - タブ設定を渡す */}
      <Tabs
        tabs={tabConfig}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />

      <form onSubmit={handleSubmit}>
        {/* 現在アクティブなタブに対応するフォームを表示 */}
        {renderActiveForm()}

        {/* プレビュー表示 */}
        <div className="preview-section">
          <h3>文章プレビュー</h3>
          <div className="preview-content">
            {generateUnifiedText(activeTab, formState[activeTab]) ? (
              <div className="preview-text">
                {generateUnifiedText(activeTab, formState[activeTab])}
              </div>
            ) : (
              <div className="empty-preview">
                文章プレビューを表示するにはフォームに入力してください
              </div>
            )}
          </div>
        </div>

        {/* フォーム送信またはキャンセル用ボタン */}
        <div className="button-group">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            キャンセル
          </button>
          <button type="submit" className="save-button">
            保存する
          </button>
        </div>
      </form>
    </div>
  );
};

export default BaseForm;
