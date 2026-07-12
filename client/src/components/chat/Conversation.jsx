import { useEffect, useRef, useState } from "react";
import socket  from "../../socket/socket";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../api/messageApi";
const Conversation = ({
  selectedUser,
  currentConversation,
  messages,
  setMessages
}) => {

  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] =
  useState(false);

  const handleSend = async (
  text
) => {
  if (
    !currentConversation ||
    !selectedUser
  )
    return;

  try {
    const res =
      await sendMessage({
        conversationId:
          currentConversation._id,
        receiverId:
          selectedUser._id,
        content: text,
      });
      setMessages((prev) => [
        ...prev,
        res.data.message,
      ]);

      socket.emit("send_message", {
        senderId: localStorage.getItem("userId"),
        receiverId: selectedUser._id,
        message: res.data.message,
      });

    console.log(
      res.data.message
    );

  } catch (err) {
    console.error(err);
  }
  
};

useEffect(() => {

  socket.on(
    "user_typing",
    () => {
      setIsTyping(true);
    }
  );

  socket.on(
    "user_stop_typing",
    () => {
      setIsTyping(false);
    }
  );

  return () => {
    socket.off("user_typing");
    socket.off("user_stop_typing");
  };

}, []);
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "15px",
          borderBottom:
            "1px solid #ddd",
        }}
      >
        <h3>
          {selectedUser
            ? selectedUser.name
            : "Select a user"}
        </h3>
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {selectedUser ? (
          <div>
  {messages.length === 0 ? (
    <p>No messages yet.</p>
  ) : (
    messages.map((message) => {
  const myId = localStorage.getItem("userId");
  const isMe =
    message.sender?._id === myId ||
    message.sender === myId;

  return (
    <div
      key={message._id}
      style={{
        display: "flex",
        justifyContent: isMe
          ? "flex-end"
          : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          maxWidth: "60%",
          padding: "10px 15px",
          borderRadius: "12px",
          backgroundColor: isMe
            ? "#4f46e5"
            : "#e5e7eb",
          color: isMe
            ? "#fff"
            : "#000",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            marginBottom: "4px",
            opacity: 0.8,
          }}
        >
          {message.sender?.name || "You"}
        </div>

        {message.content}
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5px",
    fontSize: "11px",
    opacity: 0.75,
  }}
>
  <span>
    {new Date(
      message.createdAt
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>

  {isMe && (
    <span>
      {message.isRead
        ? "✓✓ Read"
        : "✓ Sent"}
    </span>
  )}
</div>
      </div>
    </div>
  );
})
  )}
  <div ref={messagesEndRef}></div>
</div>
        ) : (
          <p>
            Choose a user to start chatting.
          </p>
        )}
      </div>
      {isTyping && (
  <p
    style={{
      marginLeft: "15px",
      color: "#666",
      fontStyle: "italic",
    }}
  >
    {selectedUser.name} is typing...
  </p>
)}

      {selectedUser && (
        <MessageInput
  onSend={handleSend}
   receiverId={selectedUser._id}
/>
      )}
    </div>
  );
};

export default Conversation;