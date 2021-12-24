import React, { useState } from "react";

const CommentsForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = '',
  handleCancel,
}) => {
  const [text, setText] = useState(initialText);

  const isTextareaDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button disabled={isTextareaDisabled}>{submitLabel}</button>
      {hasCancelButton && 
      <button type="button" onClick={handleCancel} >cancel</button>
      }
    </form>
  );
};

export default CommentsForm;
