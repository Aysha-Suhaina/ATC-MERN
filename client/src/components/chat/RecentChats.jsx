import {
  useEffect,
  useState,
} from "react";
import socket from "../../socket/socket";

import {
  getMyConversations,
} from "../../api/conversationApi";

const RecentChats = ({
  onSelectConversation,
  onlineUsers,
}) => {

  const [conversations,
    setConversations] =
    useState([]);

  const myId =
    localStorage.getItem("userId");

    const formatTime = (date) => {
  if (!date) return "";

  const messageDate = new Date(date);
  const today = new Date();

  const isToday =
    messageDate.toDateString() ===
    today.toDateString();

  if (isToday) {
    return messageDate.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  const yesterday = new Date();
  yesterday.setDate(
    yesterday.getDate() - 1
  );

  if (
    messageDate.toDateString() ===
    yesterday.toDateString()
  ) {
    return "Yesterday";
  }

  return messageDate.toLocaleDateString(
    [],
    {
      day: "numeric",
      month: "short",
    }
  );
};



  const loadConversations =
    async () => {

      try {

        const res =
          await getMyConversations();

        setConversations(
          res.data.conversations
        );

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

    <div>

      <h3>Recent Chats</h3>

      {conversations.map(
        (conversation) => {

          const otherUser =
            conversation.participants.find(
              (user) =>
                user._id !== myId
            );

          const online =
            onlineUsers.includes(
              otherUser._id
            );

          return (

            <div
              key={conversation._id}
              onClick={() =>
                onSelectConversation(
                  otherUser
                )
              }
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom:
                  "1px solid #ddd",
              }}
            >

              <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <span>
      {online ? "🟢" : "⚪"}
    </span>

    {" "}

    <strong>
      {otherUser.name}
    </strong>
  </div>

  <small
    style={{
      color: "#777",
    }}
  >
    {formatTime(
      conversation.lastMessage
        ?.createdAt
    )}
  </small>
</div>

              <small
  style={{
    color: "#666",
    display: "block",
    marginTop: "4px",
  }}
>
  {conversation.lastMessage?.content
    ?.length > 35
    ? conversation.lastMessage.content.slice(
        0,
        35
      ) + "..."
    : conversation.lastMessage?.content}
</small>

            </div>

          );

        }
      )}

    </div>

  );

};

export default RecentChats;