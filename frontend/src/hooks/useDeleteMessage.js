import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useDeleteMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const deleteMessage = async (messageId) => {
        setLoading(true);
        try {
            console.log(messageId, 'ss')
            // Make an API request to delete the message
            const res = await axios.delete(`/api/messages/${messageId}`);
            console.log(res, 'res');
            if (res.data.message == 'success') {
                toast.success(res.data.message)
                return 'success'

            }
            // Handle successful deletion
            // Update the local state by filtering out the deleted message

        } catch (error) {
            console.log(error, 'error');
            // Handle error response
            const err = error.response?.data || {};
            toast.error(err.error || 'An error occurred while deleting the message.');
        } finally {
            setLoading(false);
        }
    };

    return { deleteMessage, loading };
};
