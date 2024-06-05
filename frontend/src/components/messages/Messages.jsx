import { useGetMessages } from "../../hooks/useGetMessages.js";
import Message from "./Message.jsx";
function Messages() {
  const { messages, loading } = useGetMessages();
  console.log(messages, "messgae");
  return (
    <div className="px-4 flex-1 overflow-auto">
    
    </div>
  );
}
export default Messages;
