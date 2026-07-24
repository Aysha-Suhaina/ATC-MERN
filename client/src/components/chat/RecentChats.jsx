import { useEffect, useState } from "react";
import socket from "../../socket/socket";

import { getMyConversations } from "../../api/conversationApi";

const RecentChats = ({ onSelectConversation, onlineUsers }) => {
  const [conversations, setConversations] = useState([]);

  const myId = localStorage.getItem("userId");

  const formatTime = (date) => {
    if (!date) return "";

    const messageDate = new Date(date);
    const today = new Date();

    const isToday = messageDate.toDateString() === today.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return messageDate.toLocaleDateString([], {
      day: "numeric",
      month: "short",
    });
  };

  const loadConversations = async () => {
    try {
      const res = await getMyConversations();

      setConversations(res.data.conversations);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);
  useEffect(() => {
    const refresh = () => {
      loadConversations();
    };

    socket.on("receive_message", refresh);
    socket.on("message_sent", refresh);

    return () => {
      socket.off("receive_message", refresh);
      socket.off("message_sent", refresh);
    };
  }, []);

  return (
    <div className="recent-chats">
      <h3 className="chat-title">Recent Chats</h3>

      {conversations.length === 0 ? (
        <p className="empty-chat">No conversations yet.</p>
      ) : (
        conversations.map((conversation) => {
          const otherUser = conversation.participants.find(
            (user) => user._id !== myId,
          );

          const online = onlineUsers.includes(otherUser._id);

          return (
            <div
              key={conversation._id}
              className="chat-user.active"
              onClick={() => onSelectConversation(otherUser)}
            >
              <div className="chat-user-header">
                <div className="chat-user-info">
                  <span
                    className={`online-dot ${online ? "online" : "offline"}`}
                  />

                  <span className="chat-user-name">{otherUser.name}</span>
                </div>

                <div className="chat-user-meta">
                  <small className="chat-time">
                    {formatTime(conversation.lastMessage?.createdAt)}
                  </small>

                  {conversation.unreadCount > 0 && (
                    <span className="unread-badge">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>

              <div className="chat-last-message">
                {conversation.lastMessage?.content?.length > 35
                  ? conversation.lastMessage.content.slice(0, 35) + "..."
                  : conversation.lastMessage?.content || "No messages yet"}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecentChats;
