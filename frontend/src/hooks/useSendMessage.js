import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import axios from 'axios'
export const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await axios(`/api/messages/send/${selectedConversation._id}`, {
                method: 'post',
                data: { message }
            })
            setMessages([...messages, res.data])
        } catch (error) {
            console.log(error, 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            let err = error.response;
            toast.error(err.data.error);
        } finally {
            setLoading(false);
        }
    }

    return { sendMessage, loading }
}
