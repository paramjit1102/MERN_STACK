import { useAuthContext } from "../../context/AuthContent";
import useConversation from "../../zustand/useConversation";
import extractTime from "../../utils/extractTime.js";
import { FaUser } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDeleteMessage } from "../../hooks/useDeleteMessage.js";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { deleteMessage, loading } = useDeleteMessage(); // Call the hook here
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const formatDate = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

   // Handle delete click
   const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        // Call deleteMessage with the message ID and wait for it to complete
        await deleteMessage(message._id);
        // Optionally, handle additional UI updates here if necessary
      } catch (error) {
        console.error("Error deleting message:", error);
        // Optionally, handle error feedback here
      }
    }
  };
  const deleteButton =fromMe===true?{handleDeleteClick}:"";
  const hidebutton =fromMe ? "" : "d-none";
  return (
    <div className={`chat ${chatClassName}`}>
      <div>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Profile Picture" src={profilePic} />
          </div>
        </div>
        <div
          className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
        >
          {message.message}
        </div>
        <div className="chat-footer opacity-75 text-xs text-white flex gap-1 items-center">
          {formatDate}
        </div>
      </div>

      <div className={`w-10 rounded-full cursor-pointer ${hidebutton}`}  onClick={deleteButton.handleDeleteClick} >
        <RiDeleteBinLine className="w-10" />
      </div>
    </div>
  );
};

export default Message;
