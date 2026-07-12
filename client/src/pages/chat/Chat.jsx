import { useState,useEffect } from "react";

import socket from "../../socket/socket";
import Sidebar from "../../components/chat/Sidebar";
import Conversation from "../../components/chat/Conversation";
import { openConversation } from "../../api/conversationApi";
import { getMessages } from "../../api/messageApi";
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
  socket.on("online_users", (users) => {
  console.log("ONLINE USERS EVENT RECEIVED");
  console.log(users);

  setOnlineUsers(users);
});
  socket.on(
    "receive_message",
    (message) => {
      setMessages((prev) => [
        ...prev,
        message.message,
      ]);
    }
  );


  return () => {
    socket.off("receive_message");
    socket.off("online_users");
  };
}, []);

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