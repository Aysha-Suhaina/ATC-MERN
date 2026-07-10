import { useState } from "react";

const MessageInput = ({
  onSend,
}) => {
  const [text, setText] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "15px",
      }}
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        style={{
          flex: 1,
        }}
      />

      <button type="submit">
        Send
      </button>
    </form>
  );
};

export default MessageInput;