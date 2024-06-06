import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';
import tap_notification from '../assets/sounds/tap-notification.mp3';
import live_notification from '../assets/sounds/livechat.mp3';
const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(live_notification);
            sound.play();
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])


}

export default useListenMessages