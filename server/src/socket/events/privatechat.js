import { userRoom } from "./connection.js";
export const registerPrivateChat = (io, socket) => {
  socket.on("send_message", (data) => {
    const { receiverId, message } = data;
    const senderId = socket.data.userId;

    console.log(`${senderId} → ${receiverId}`);

    io.to(userRoom(receiverId)).emit("receive_message", {
      senderId,
      message,
    });
    io.to(userRoom(senderId)).emit("receive_message", {
      senderId,
      message,
    });
  });

  socket.on("message_read", ({ receiverId }) => {
    const senderId = socket.data.userId;

    io.to(userRoom(senderId)).emit("message_read", {
      receiverId,
    });
  });

  socket.on("typing", ({ receiverId }) => {
    const senderId = socket.data.userId;

    io.to(userRoom(receiverId)).emit("user_typing", {
      senderId,
    });
  });

  socket.on("stop_typing", ({ receiverId }) => {
    const senderId = socket.data.userId;

    io.to(userRoom(receiverId)).emit("user_stop_typing", {
      senderId,
    });
  });
};
