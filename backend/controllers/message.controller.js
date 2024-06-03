import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async function (req, res) {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderid = req.user._id;
        let conversation = await Conversation.findOne({
            participents: { $all: [senderid, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participents: [senderid, receiverId]
            });
        }
        const newMessage = new Message({
            senderid,
            receiverId,
            message
        })

    
    } catch (error) {
        console.log(error.message, "Error in message controller sendMessage error");
        res.status(500).json({ error: "Internal server error" });
    }
};
