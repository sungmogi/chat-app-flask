import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login ({ socket }) {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();


    const handleLogin = (evt) => {
        evt.preventDefault();
        localStorage.setItem('userName', userName);
        socket.emit('send_message', {user: userName, message: 'entered'});
        navigate('/chat');
    }
    
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor='userName'>Enter a username: </label>
                <input id='userName' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                <br/>
                <button>Login</button>
            </form>
        </>
    )
}