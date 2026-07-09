import { useState } from "react";
import Sidebar from "../../components/chat/Sidebar";
import Conversation from "../../components/chat/Conversation";

const Chat = () => {
  const [selectedUser, setSelectedUser] =
    useState(null);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <Conversation
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Chat;