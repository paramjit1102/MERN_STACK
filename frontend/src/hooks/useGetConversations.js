import { useEffect, useState } from 'react'
import axios from 'axios';
const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState(false);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await axios('/api/users')
                setConversations(res.data);
            } catch (error) {
                let err = error.response;
                toast.error(err.data.error);
            } finally {
                setLoading(false);
            }
        }
        getConversations()
    }, [])
    return { loading, conversations }
}

export default useGetConversations