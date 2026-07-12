import { userToSocket } from "../utils/socketStore.js";
export const registerPrivateChat = (
  io,
  socket
) => {

  socket.on(
    "send_message",
    (data) => {

      const {
        senderId,
        receiverId,
        message,
      } = data;

      console.log(
        `${senderId} → ${receiverId}`
      );

     const receiverSocket =
  userToSocket.get(receiverId);

      if (!receiverSocket) {

        console.log(
          "Receiver Offline"
        );

        return;

      }
      io.to(receiverSocket).emit(
        "receive_message",
        {
          senderId,
          message,
        }
      );
    }
  );

  socket.on(
  "message_read",
  ({ senderId, receiverId }) => {

    const senderSocket =
      userToSocket.get(senderId);

    if (!senderSocket) return;

    io.to(senderSocket).emit(
      "message_read",
      {
        receiverId,
      }
    );

  }
);

  socket.on(
  "typing",
  ({ senderId, receiverId }) => {

    const receiverSocket =
      userToSocket.get(receiverId);

    if (!receiverSocket) return;

    io.to(receiverSocket).emit(
      "user_typing",
      {
        senderId,
      }
    );

  }
);

socket.on(
  "stop_typing",
  ({ senderId, receiverId }) => {

    const receiverSocket =
      userToSocket.get(receiverId);

    if (!receiverSocket) return;

    io.to(receiverSocket).emit(
      "user_stop_typing",
      {
        senderId,
      }
    );

  }
);
};