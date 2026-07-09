import MessageInput from "./MessageInput";

const Conversation = ({
  selectedUser,
}) => {
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
          <p>
            Conversation goes here...
          </p>
        ) : (
          <p>
            Choose a user to start chatting.
          </p>
        )}
      </div>

      {selectedUser && (
        <MessageInput />
      )}
    </div>
  );
};

export default Conversation;