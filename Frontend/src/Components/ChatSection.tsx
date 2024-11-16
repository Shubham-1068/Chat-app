import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://chat-app-2-izxz.onrender.com');

const ChatSection = () => {
  const [username, setUsername] = useState("User");
  const [msg, setmsg] = useState("");
  const [chat, setchat] = useState([]);

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  useEffect(() => {
    fetch('https://chat-app-2-izxz.onrender.com/chats').then(res => res.json()).then(data => {
      setchat(data)
    })

    socket.on("history", (history) => {
      console.log('Received history:', history);
      setchat(history)
    })
  }, [])

  useEffect(() => {
    socket.on("message", (message) => {
      console.log('Received message:', message);
    })
  }, [socket])

  function handleSendMessage() {
    socket.emit('message', { message: msg, sender: username });
    setmsg("");
  }

  return (
    <div className="flex flex-col h-screen w-screen mx-auto overflow-hidden shadow-lg bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-indigo-600 p-4 flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{username}</h1>
            <p className="text-sm text-indigo-200">Online</p>
          </div>
        </div>
        <div className="flex items-center font-semibold text-white">
          <span className="mr-2">Username</span>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="ml-2 border border-gray-300 rounded-md p-2 text-gray-800 w-full sm:w-auto"
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {chat.map((message: any, index) => (
          <div key={index}>
            <p className={`text-sm text-gray-800 px-2 mb-1 font-semibold ${message.sender === username ? 'text-right' : ''}`}>{message.sender}</p>
            <div className={`flex items-center mb-2 ${message.sender === username ? 'justify-end' : ''}`}>
              <div className={`flex flex-col max-w-[80%] sm:max-w-[70%] p-2 rounded-lg break-words ${message.sender === username ? 'bg-indigo-600 text-white' : 'bg-indigo-200 text-gray-800'}`}>
                {message.message}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t border-indigo-100">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
            className="flex-grow bg-indigo-50 border border-indigo-200 rounded-full px-4 py-2 text-indigo-800 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button type="button" className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button 
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
            onClick={handleSendMessage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
