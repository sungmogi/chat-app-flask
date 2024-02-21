import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Chat({ socket }) {
    const navigate = useNavigate();
   
    const [messages, setMessages] = useState([]);
    const userName = localStorage.getItem('userName');

    const [chat, setChat] = useState('');

    const sendChat = (evt) => {
        evt.preventDefault();
        socket.emit('send_message', {user: userName, message: chat});
        //console.log(chat);
        setChat('');
    }

    const logOut = (evt) => {
        localStorage.removeItem('userName');
        socket.emit('send_message', {user: userName, message: 'left'});
        navigate('/')
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((oldMessages) => [...oldMessages, data])
        });

        return () => {
            socket.off('receive_message');
        };
    }, [socket])

    return (
        <>
            <h1>Welcome, {userName}</h1>
            <form onSubmit={sendChat}>
                <input value={chat} onChange={(e) => setChat(e.target.value)}></input>
                <button>Send</button>
            </form>
            {messages && 
                <ul>
                    {messages.map((msg, idx) => <li key={idx}>{userName===msg.user ? 'Me' : msg.user}: {msg.message}</li>)}
                </ul>}
            <button onClick={logOut}>Log Out</button>
        </>
    )
}