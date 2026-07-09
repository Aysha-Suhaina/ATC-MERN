const MessageInput = () => {
  return (
    <div
      style={{
        borderTop: "1px solid #ddd",
        padding: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Type a message..."
        style={{ width: "80%" }}
      />

      <button>Send</button>
    </div>
  );
};

export default MessageInput;