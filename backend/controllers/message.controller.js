import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

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
    console.log(error.message, "Error in message controller getMessage error");
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteMessage = async function (req, res) {
  try {
    // const { message } = req.body;
    const { id: messageID } = req.params;
    console.log(req.params,'req.params;')
    let deleteconversation = await Message.deleteOne({ _id: messageID });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message, "Error in message controller sendMessage error");
    res.status(500).json({ error: "Internal server error" });
  }
};