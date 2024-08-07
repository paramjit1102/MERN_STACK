import { useAuthContext } from "../../context/AuthContent";
import useConversation from "../../zustand/useConversation";
import extractTime from "../../utils/extractTime.js";
import { FaUser } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri"
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const formatDate = extractTime(message.createdAt);
  const profilePic = fromMe? authUser.profilePic: selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
      {/* <FaUser className="w-10 rounded-full"/> */}
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 `}> {message.message}
        <button>{message._id}-DELETE</button>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}><RiDeleteBinLine onClick={handleClick(message._id)} /></div>
      <div className="chat-footer opacity-75 text-xs  text-white flex gap-1  items-center"> {formatDate} </div>
    </div>
  );
};

export default Message;
