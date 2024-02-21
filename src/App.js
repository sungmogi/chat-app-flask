import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Chat';
import Login from './Login';
import socketIO from 'socket.io-client'; 

const socket = socketIO.connect('http://127.0.0.1:5000')

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login socket={socket}/>}/>
        <Route path='/chat' element={<Chat socket={socket}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
