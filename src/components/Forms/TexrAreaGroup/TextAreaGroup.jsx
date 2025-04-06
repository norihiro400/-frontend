import React from "react";
import "./TextAreaGroup.css";

function TextArea({
  title = "Point(主張)",
  value = "",
  name = "",
  handleInputChange = () => {},
  placeholder = "あなたの主張や結論を書いてください",
  rows = "3",
}) {
  return (
    <div className="form-group">
      <label>{title}</label>
      <textarea
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}

export default TextArea;
