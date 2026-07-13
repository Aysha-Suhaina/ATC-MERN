import { useState,useEffect } from "react";

import socket from "../../socket/socket";
import Sidebar from "../../components/chat/Sidebar";
import Conversation from "../../components/chat/Conversation";
import { openConversation } from "../../api/conversationApi";
import { getMessages,markAsRead } from "../../api/messageApi";
const Chat = () => {
  const [selectedUser, setSelectedUser] =
    useState(null);

  const [
    currentConversation,
    setCurrentConversation,
  ] = useState(null);

  const [messages, setMessages] =
    useState([]);

    const [onlineUsers, setOnlineUsers] =
  useState([]);
useEffect(() => {
  console.log("Chat mounted");

  const handleOnlineUsers = (users) => {
    setOnlineUsers(users);
  };

  const handleReceiveMessage = async (data) => {
    setMessages((prev) => [
      ...prev,
      data.message,
    ]);

    if (
      currentConversation &&
      data.message.conversation ===
        currentConversation._id
    ) {
      await markAsRead(
        currentConversation._id
      );

      const updated =
        await getMessages(
          currentConversation._id
        );

      setMessages(
        updated.data.messages
      );
    }
  };

  const handleMessageRead = ({
    messageId,
  }) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === messageId
          ? {
              ...msg,
              isRead: true,
            }
          : msg
      )
    );
  };

  socket.on(
    "online_users",
    handleOnlineUsers
  );

  socket.on(
    "receive_message",
    handleReceiveMessage
  );

  socket.on(
    "message_read",
    handleMessageRead
  );

  return () => {
    socket.off(
      "online_users",
      handleOnlineUsers
    );

    socket.off(
      "receive_message",
      handleReceiveMessage
    );

    socket.off(
      "message_read",
      handleMessageRead
    );
  };
}, [currentConversation]);

  const handleSelectUser = async (user) => {
  setSelectedUser(user);

  try {
    // Open or get existing conversation
    const conversationRes =
      await openConversation(user._id);

    const conversation =
      conversationRes.data.conversation;

    setCurrentConversation(
      conversation
    );

    // Load all previous messages
    const messagesRes =
      await getMessages(
        conversation._id
      );

    setMessages(
      messagesRes.data.messages
    );
    await markAsRead(
  conversation._id
);
const updatedMessages =
  await getMessages(
    conversation._id
  );

setMessages(
  updatedMessages.data.messages
);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={
          handleSelectUser
        }
        onlineUsers={onlineUsers}
      />

      <Conversation
        selectedUser={selectedUser}
        currentConversation={currentConversation}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
};

export default Chat;