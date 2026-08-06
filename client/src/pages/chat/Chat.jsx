import { useState, useEffect } from "react";

import socket from "../../socket/socket";
import { useSocket } from "../../context/SocketContext";
import Sidebar from "../../components/chat/Sidebar";
import Conversation from "../../components/chat/Conversation";
import { openConversation } from "../../api/conversationApi";
import { getMessages, markAsRead } from "../../api/messageApi";
import "../../components/chat/chat.css";
const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshChats, setRefreshChats] = useState(0);
  const [currentConversation, setCurrentConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const { onlineUsers } = useSocket();

  useEffect(() => {
    const handleReceiveMessage = async (data) => {
      const myId = localStorage.getItem("userId");

      if (data.senderId === myId) {
        return;
      }
      if (
        currentConversation &&
        data.message.conversation === currentConversation._id
      ) {
        setMessages((prev) => [...prev, data.message]);

        await markAsRead(currentConversation._id);

        const updated = await getMessages(currentConversation._id);

        setMessages(updated.data.messages);
      }

      console.log("Incoming:", data.message.conversation);
    };

    const handleMessageRead = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((message) =>
          message._id === messageId
            ? {
                ...message,
                isRead: true,
              }
            : message,
        ),
      );
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_read", handleMessageRead);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_read", handleMessageRead);
    };
  }, [currentConversation]);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);

    try {
      // Open or get existing conversation
      const conversationRes = await openConversation(user._id);

      const conversation = conversationRes.data.conversation;

      setCurrentConversation(conversation);
      setRefreshChats((prev) => prev + 1);

      // Load all previous messages
      const messagesRes = await getMessages(conversation._id);

      setMessages(messagesRes.data.messages);
      await markAsRead(conversation._id);
      const updatedMessages = await getMessages(conversation._id);

      setMessages(updatedMessages.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-page">
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={handleSelectUser}
        onlineUsers={onlineUsers}
        refreshChats={refreshChats}
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
