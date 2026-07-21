import { useEffect, useRef, useState } from "react";
import socket from "../../socket/socket";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../api/messageApi";
const Conversation = ({
  selectedUser,
  currentConversation,
  messages,
  setMessages,
}) => {
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text) => {
    if (!currentConversation || !selectedUser) return;

    try {
      const res = await sendMessage({
        conversationId: currentConversation._id,
        receiverId: selectedUser._id,
        content: text,
      });

      setMessages((prev) => [...prev, res.data.message]);

      socket.emit("send_message", {
        senderId: localStorage.getItem("userId"),
        receiverId: selectedUser._id,
        message: res.data.message,
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const handleTyping = ({ senderId }) => {
      if (selectedUser && senderId === selectedUser._id) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = ({ senderId }) => {
      if (selectedUser && senderId === selectedUser._id) {
        setIsTyping(false);
      }
    };

    socket.on("user_typing", handleTyping);

    socket.on("user_stop_typing", handleStopTyping);

    return () => {
      socket.off("user_typing", handleTyping);

      socket.off("user_stop_typing", handleStopTyping);
    };
  }, [selectedUser]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
  <div className="chat-conversation">
    <div className="conversation-header">
      <h3>
        {selectedUser ? selectedUser.name : "Select a user"}
      </h3>
    </div>

    <div className="conversation-body">
      {selectedUser ? (
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="chat-empty">
              No messages yet.
            </div>
          ) : (
            messages.map((message) => {
              const myId = localStorage.getItem("userId");

              const isMe =
                message.sender?._id === myId ||
                message.sender === myId;

              return (
                <div
                  key={message._id}
                  className={`message-row ${
                    isMe ? "mine" : ""
                  }`}
                >
                  <div className="message-bubble">
                    <div className="message-author">
                      {message.sender?.name || "You"}
                    </div>

                    <div className="message-content">
                      {message.content}
                    </div>

                    <div className="message-meta">
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
        <div className="chat-empty">
          Choose a user to start chatting.
        </div>
      )}
    </div>

    {isTyping && (
      <div className="typing-indicator">
        {selectedUser.name} is typing...
      </div>
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
