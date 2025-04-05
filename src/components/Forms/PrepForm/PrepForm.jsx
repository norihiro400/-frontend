import React from 'react'
import TextArea from '../TexrAreaGroup/TextAreaGroup'

function PrepForm({
    formData = {point:"",reason:"",example:"",pointSummary:""},
    handleInputChange}) {



  return (
    <div>
        <TextArea
        title="Point(主張)"
        value = {formData.point}
        handleInputChange 
        placeholder ="あなたの主張や結論を書いてください"
        rows="3" 
        />
        
        <TextArea
        title="Reason (理由)"
        value={formData.reason}
        onChange={handleInputChange}
        placeholder="主張の理由や根拠を書いてください"
        rows="3" 
        />
        
        <TextArea
        title="Example (具体例)"
        value={formData.example}
        onChange={handleInputChange}
        placeholder="具体例や説明例を書いてください"
        rows="3" 
        />
        
        <TextArea
        title="Point (まとめ)"
        value={formData.pointSummary}
        onChange={handleInputChange}
        placeholder="もう一度主張を強調し、まとめてください"
        rows="3" 
        />
        
    </div>
  )
}

export default PrepForm