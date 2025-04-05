import React, { useState } from 'react';
import "./BaseForm.css"
import Tabs from '../../Tabs/Tabs';
import PrepForm from '../PrepForm/PrepForm';
import FreeForm from '../FreeForm/FreeForm';



//自身の回答をpropsとして受け取って利用する
const BaseForm= ({goal = "useEffectの挙動を理解して他人に説明できるようになること", target = "プログラミング"}) => {  
  
  // フォームの状態を管理
  const [formData, setFormData] = useState({
    point: '',
    reason: '',
    example: '',
    pointSummary: ''
  });
  
    // 入力変更のハンドラ
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };



  // タブの状態管理
  const [activeTab, setActiveTab] = useState('prep');
  
    // タブ切り替えのハンドラ
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };




  // プレビュー表示の状態
  const [showPreview, setShowPreview] = useState(false);
  

  // フォーム送信のハンドラ
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('フォームデータを送信:', formData);
    // ここでAPIへの送信などの処理を行う
  };
  
  // プレビューの表示/非表示を切り替え
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  // キャンセルボタンのハンドラ
  const handleCancel = () => {
    // フォームをリセットするなどの処理
    setFormData({
      point: '',
      reason: '',
      example: '',
      pointSummary: ''
    });
    setShowPreview(false);
  };
  
  return (
    <div className="base-form-container">
      <h2 className="form-title">文章の作成</h2>
      
      {/* タブ切り替え */}
      <Tabs activeTab={activeTab} handleTabChange={handleTabChange}/>
      
      <form onSubmit={handleSubmit}>
        {activeTab === "prep" && <PrepForm/>}
        {activeTab === "free" && <FreeForm/>}
        
        {/* プレビュー */}
        <div className="preview-section">
          <h3>プレビュー</h3>
          {formData.point || formData.reason || formData.example || formData.pointSummary ? (
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
          ) : (
            <div className="empty-preview">プレビューするにはフォームに入力してください</div>
          )}
        </div>
        
        {/* ボタン */}
        <div className="button-group">
          <button 
            type="button" 
            className="cancel-button"
            onClick={handleCancel}
          >
            キャンセル
          </button>
          <button 
            type="submit" 
            className="save-button"
          >
            保存する
          </button>
        </div>
      </form>
    </div>
  );
};

export default BaseForm;