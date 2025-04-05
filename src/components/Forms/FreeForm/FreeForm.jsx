import React from 'react'
import TextArea from '../TexrAreaGroup/TextAreaGroup'
import "./FreeForm.css"

// 自由記入用のフォーム
function FreeForm({formData = {content:"hogehoge"}, handleInputChange}) {
  return (
    <>
        <section className='form-input-section'>
            <TextArea
            title="自由記入"
            name = "content"
            value = {formData.content}
            handleInputChange = {handleInputChange}
            placeholder ="自由に文章を作成してください"
            rows="5" 
            />
        </section>

        {/* 入力内容プレビューセクション*/}
        <section className="preview-section">
            <h3>プレビュー</h3>
            <div className="preview-content">
                {formData.content && (
                <div className="preview-item">
                    <div className="preview-label">[自由記入]</div>
                    <div className="preview-text">{formData.content}</div>
                </div>
                )}
            </div>
        </section>
    </>
  )
  
}

export default FreeForm