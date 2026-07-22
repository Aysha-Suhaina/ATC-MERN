import { useRef, useState } from "react";
import Button from "../ui/Button";
import socket from "../../socket/socket";

const MessageInput = ({ onSend, receiverId }) => {
  const [text, setText] = useState("");

  const typingTimer = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSend(text);

    socket.emit("stop_typing", {
      senderId: localStorage.getItem("userId"),
      receiverId,
    });

    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);

    socket.emit("typing", {
      senderId: localStorage.getItem("userId"),
      receiverId,
    });

    clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(() => {
      socket.emit("stop_typing", {
        senderId: localStorage.getItem("userId"),
        receiverId,
      });
    }, 1000);
  };

  return (
    <div className="chat-input-area">
      <form
        className="chat-input-row"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={text}
          onChange={handleChange}
        />

        <Button type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;