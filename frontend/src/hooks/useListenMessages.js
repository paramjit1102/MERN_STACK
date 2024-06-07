import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';
import live_notification from '../assets/livechat.mp3';
const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(live_notification);
            sound.play();
            if (selectedConversation._id === newMessage?.senderId) setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
}

export default useListenMessages