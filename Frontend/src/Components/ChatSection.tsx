import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './Logout';

const socket = io('https://chat-app-2-izxz.onrender.com');

const ChatSection = () => {
  const [username, setUsername] = useState("");
  const [msg, setmsg] = useState("");
  const [chat, setchat] = useState<string[]>([]);

  // Reference to the chat container
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setUsername(user?.name ?? '');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetch('https://chat-app-2-izxz.onrender.com/chats')
      .then(res => res.json())
      .then(data => {
        setchat(data);
        if (data.length > 0) {
          document.getElementById('preloader')!.style.display = 'none';
          document.getElementById('chat')!.classList.remove('blur-[2px]');
        }
      });

    socket.on("history", (history) => {
      console.log('Received history:', history);
      setchat(history);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log('Received message:', message);
      setchat((prevChat) => [...prevChat, message]);
    });
  }, [socket]);

  // Scroll to the bottom whenever the chat updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  function handleSendMessage() {
    socket.emit('message', { message: msg, sender: username });
    setmsg("");
  }

  return (
    <>
      {/* PRELOADER FOR MESSAGES */}
      <div id='preloader' className="absolute z-20 top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col gap-4">
        <div className="flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#6a4cfc]"></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
        </div>
        <p className='text-xl font-semibold text-white'>Please wait...</p>
      </div>

      <div id='chat' className="flex flex-col h-screen w-screen mx-auto overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 md:p-4 p-3 flex sm:flex-row gap-2 sm:gap-0 items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
              <img src={user?.picture} alt={user?.name} />
            </div>
            <div>
              <h1 className="md:text-xl font-bold text-white">{username}</h1>
            </div>
          </div>

          <LogoutButton />
        </div>
        <div className="flex-grow overflow-y-auto p-4 bg-white rounded-b-xl">
          {chat.map((message: any, index) => (
            <div key={index}>
              <p className={`text-sm text-[#6a4cfc] px-2 mb-1 font-semibold ${message.sender === username ? 'text-right' : ''}`}>{message.sender}</p>
              <div className={`flex items-center mb-2 ${message.sender === username ? 'justify-end' : ''}`}>
                <div className={`flex flex-col max-w-[80%] sm:max-w-[70%] p-3 rounded-lg break-words ${message.sender === username ? 'bg-[#6a4cfc] text-white' : 'bg-[#e4e5e6] text-[#6a4cfc]'}`}>
                  {message.message}
                </div>
              </div>
            </div>
          ))}
          {/* This element will ensure scrolling to the bottom */}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4 bg-white border-t border-[#6a4cfc]">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={msg}
              onChange={(e) => setmsg(e.target.value)}
              className="flex-grow bg-[#f1f5f9] border border-[#6a4cfc] rounded-full px-4 py-2 text-[#6a4cfc] placeholder-[#6a4cfc] focus:outline-none focus:ring-2 focus:ring-[#6a4cfc] focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button type="button" className="text-[#6a4cfc] hover:bg-[#f1f5f9] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6a4cfc]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              className="bg-[#6a4cfc] text-white p-2 rounded-full hover:bg-[#5b41c7] focus:outline-none focus:ring-2 focus:ring-[#6a4cfc] focus:ring-offset-2"
              onClick={handleSendMessage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSection;
