import {
  getUserConversations,
  getConversationMessages,
} from "../services/chat.service.js";

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
  console.error("====== OPEN CONVERSATION ERROR ======");
  console.error(error);
  console.error(error.stack);

  return res.status(500).json({
    success: false,
    msg: error.message,
  });
}
};