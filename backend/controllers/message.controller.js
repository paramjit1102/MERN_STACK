import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async function (req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participents: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participents: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message, "Error in message controller sendMessage error");
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMessages = async function (req, res) {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participents: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    onsole.log(error.message, "Error in message controller getMessage error");
    res.status(500).json({ error: "Internal server error" });
  }
};
