import Message from "../model/Message.js";
import Conversation from "../model/Conversation.js";
import { getIO } from "../socket/socket.js";
import { userRoom } from "../socket/events/connection.js";
export const getMessages = async (
  req,
  res
) => {
  try {
    const messages =
      await Message.find({
        conversation:
          req.params.conversationId,
      })
        .populate(
          "sender",
          "name"
        )
        .sort({
          createdAt: 1,
        });

    res.json({
      success: true,
      messages,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
export const sendMessage = async (
  req,
  res
) => {
  try {
    const {
      conversationId,
      receiverId,
      content,
    } = req.body;

    const message =
      await Message.create({
        conversation:
          conversationId,
        sender: req.user._id,
        receiver: receiverId,
        content,
      });

    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage:
          message._id,
      }
    );

    const populatedMessage =
      await Message.findById(
        message._id
      ).populate(
        "sender",
        "name"
      );

    res.status(201).json({
      success: true,
      message:
        populatedMessage,
    });

  } catch (error) {
  console.error("SEND MESSAGE ERROR");
  console.error(error);

  return res.status(500).json({
    success: false,
    msg: error.message,
  });
}
};
export const markAsRead = async (
  req,
  res
) => {
  try {

    const unreadMessages =
      await Message.find({
        conversation:
          req.params.conversationId,
        receiver: req.user._id,
        isRead: false,
      });

    await Message.updateMany(
      {
        conversation:
          req.params.conversationId,
        receiver: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    const io = getIO();

    unreadMessages.forEach(
      (message) => {

        io.to(userRoom(message.sender.toString())).emit(
          "message_read",
          { messageId: message._id.toString() }
        );

      }
    );

    res.json({
      success: true,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      msg: error.message,
    });

  }
};
