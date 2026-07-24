import {
  getUserConversations,
  getConversationMessages,
} from "../services/chat.service.js";
import Message from "../model/Message.js";

import Conversation from "../model/Conversation.js";

export const getConversations = async (req, res) => {
  try {
    const conversations = await getUserConversations(req.user._id);

    res.json({
      success: true,
      conversations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await getConversationMessages(req.params.id);

    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export const openConversation = async (
  req,
  res
) => {
  try {
    const { receiverId } = req.body;

    let conversation =
      await Conversation.findOne({
        isGroup: false,
        participants: {
          $all: [
            req.user._id,
            receiverId,
          ],
        },
      });

    if (!conversation) {
      conversation =
        await Conversation.create({
          participants: [
            req.user._id,
            receiverId,
          ],
        });
    }

    res.json({
      success: true,
      conversation,
    });

 } catch (error) {
  console.error("=== OPEN CONVERSATION ERROR ===");
  console.error(error);
  console.error(error.stack);

  return res.status(500).json({
    success: false,
    msg: error.message,
  });
}
};

export const getMyConversations = async (
  req,
  res
) => {
  try {
    const conversations =
      await Conversation.find({
        participants: req.user._id,
      })
        .populate(
          "participants",
          "name role department"
        )
        .populate({
          path: "lastMessage",
          populate: {
            path: "sender",
            select: "name",
          },
        })
        .sort({
          updatedAt: -1,
        });

    const conversationsWithUnread =
      await Promise.all(
        conversations.map(
          async (conversation) => {

            const unreadCount =
              await Message.countDocuments({
                conversation:
                  conversation._id,

                sender: {
                  $ne: req.user._id,
                },

                isRead: false,
              });

            return {
              ...conversation.toObject(),
              unreadCount,
            };
          }
        )
      );

    res.json({
      success: true,
      conversations:
        conversationsWithUnread,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      msg: error.message,
    });

  }
};