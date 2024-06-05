import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async (message) => {
      setLoading(true);
      try {
        const res = await axios(`/api/messages/${selectedConversation._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        let err = error.response;
        toast.error(err.data.error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};
