import MessageInput from "./MessageInput";
import { sendMessage } from "../../api/messageApi";
const Conversation = ({
  selectedUser,
  currentConversation,
  messages,
}) => {

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

    console.log(
      res.data.message
    );

  } catch (err) {
    console.error(err);
  }
};
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
        }}
      >
        {selectedUser ? (
          <div>
  {messages.length === 0 ? (
    <p>No messages yet.</p>
  ) : (
    messages.map((message) => (
      <div
        key={message._id}
        style={{
          marginBottom: "10px",
        }}
      >
        <strong>
          {message.sender?.name}
        </strong>

        <br />

        {message.content}
      </div>
    ))
  )}
</div>
        ) : (
          <p>
            Choose a user to start chatting.
          </p>
        )}
      </div>

      {selectedUser && (
        <MessageInput
  onSend={handleSend}
/>
      )}
    </div>
  );
};

export default Conversation;