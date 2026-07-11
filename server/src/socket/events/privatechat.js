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
      io.emit("test_event", "HELLO");
      io.to(receiverSocket).emit(
        "receive_message",
        {
          senderId,
          message,
        }
      );
    }
  );
};