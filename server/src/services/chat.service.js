import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";

export const getUserConversations = async (userId) => {
  return await Conversation.find({
    participants: userId,
  })
    .populate("participants", "name email role")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });
};

export const getConversationMessages = async (
  conversationId
) => {
  return await Message.find({
    conversation: conversationId,
  })
    .populate("sender", "name")
    .populate("receiver", "name")
    .sort({ createdAt: 1 });
};