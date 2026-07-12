import { useRef, useState } from "react";
import socket from "../../socket/socket";

const MessageInput = ({
  onSend,
  receiverId,
}) => {
  const [text, setText] =
    useState("");

  const typingTimer =
    useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSend(text);

    socket.emit("stop_typing", {
      senderId:
        localStorage.getItem("userId"),
      receiverId,
    });

    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);

    socket.emit("typing", {
      senderId:
        localStorage.getItem("userId"),
      receiverId,
    });

    clearTimeout(
      typingTimer.current
    );

    typingTimer.current =
      setTimeout(() => {
        socket.emit(
          "stop_typing",
          {
            senderId:
              localStorage.getItem(
                "userId"
              ),
            receiverId,
          }
        );
      }, 1000);
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
        onChange={handleChange}
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