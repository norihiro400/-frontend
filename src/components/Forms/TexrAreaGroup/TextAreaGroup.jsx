import React from 'react'

function TextArea({title="Point(主張)",value = "" ,handleInputChange =()=>{} ,placeholder ="あなたの主張や結論を書いてください",rows="3" }) {
  return (
        <div className="form-group">
          <label>{title}</label>
          <textarea
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            rows={rows}
          />
        </div>
  )
}

export default TextArea