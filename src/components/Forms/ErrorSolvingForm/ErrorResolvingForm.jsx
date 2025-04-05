import React from 'react'
import TextArea from '../TexrAreaGroup/TextAreaGroup'
import "./ErrorSolvingForm.css"

function ErrorSolvingForm({ 
  formData = {
    problem: '',
    errorMessage: '',
    possibleCauses: '',
    attemptedSolutions: '',
    finalSolution: '',
    learnings: ''
  },
  handleInputChange 
}) {
  return (
    <div>
        {/* フォーム入力セクション*/}
        <section className='form-input-section'>
            <TextArea
              title="Problem (問題)"
              name="problem"
              value={formData.problem}
              handleInputChange={handleInputChange}
              placeholder="直面している問題や発生しているエラーの概要を書いてください"
              rows="3" 
            />
            
            <TextArea
              title="Error Message (エラーメッセージ)"
              name="errorMessage"
              value={formData.errorMessage}
              handleInputChange={handleInputChange}
              placeholder="表示されているエラーメッセージやログの詳細を書いてください"
              rows="3" 
            />
            
            <TextArea
              title="Possible Causes (考えられる原因)"
              name="possibleCauses"
              value={formData.possibleCauses}
              handleInputChange={handleInputChange}
              placeholder="問題が発生した可能性のある原因や仮説を列挙してください"
              rows="3" 
            />
            
            <TextArea
              title="Attempted Solutions (試した解決策)"
              name="attemptedSolutions"
              value={formData.attemptedSolutions}
              handleInputChange={handleInputChange}
              placeholder="すでに試した解決策とその結果について書いてください"
              rows="3" 
            />

            <TextArea
              title="Final Solution (最終的な解決策)"
              name="finalSolution"
              value={formData.finalSolution}
              handleInputChange={handleInputChange}
              placeholder="問題を解決した方法や実装した修正について書いてください"
              rows="3" 
            />
            
            <TextArea
              title="Learnings (学び)"
              name="learnings"
              value={formData.learnings}
              handleInputChange={handleInputChange}
              placeholder="この問題から学んだこと、今後の再発防止策などを書いてください"
              rows="3" 
            />
        </section>

        {/* 入力内容プレビューセクション*/}
        <section className="preview-section">
            <h3>プレビュー</h3>
            <div className="preview-content">
                {formData.problem && (
                <div className="preview-item">
                    <div className="preview-label">[問題]</div>
                    <div className="preview-text">{formData.problem}</div>
                </div>
                )}
                
                {formData.errorMessage && (
                <div className="preview-item">
                    <div className="preview-label">[エラーメッセージ]</div>
                    <div className="preview-text">{formData.errorMessage}</div>
                </div>
                )}
                
                {formData.possibleCauses && (
                <div className="preview-item">
                    <div className="preview-label">[考えられる原因]</div>
                    <div className="preview-text">{formData.possibleCauses}</div>
                </div>
                )}
                
                {formData.attemptedSolutions && (
                <div className="preview-item">
                    <div className="preview-label">[試した解決策]</div>
                    <div className="preview-text">{formData.attemptedSolutions}</div>
                </div>
                )}

                {formData.finalSolution && (
                <div className="preview-item">
                    <div className="preview-label">[最終的な解決策]</div>
                    <div className="preview-text">{formData.finalSolution}</div>
                </div>
                )}
                
                {formData.learnings && (
                <div className="preview-item">
                    <div className="preview-label">[学び]</div>
                    <div className="preview-text">{formData.learnings}</div>
                </div>
                )}
            </div>
        </section>
    </div>
  )
}

export default ErrorSolvingForm