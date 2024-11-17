import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import io from 'socket.io-client';
import '../App.css';  // Custom styles

const socket = io('http://localhost:4000'); // Connect to the server

const generateUserId = () => {
  return 'user_' + Math.random().toString(36).substring(2, 9); // Generate a unique user ID
};

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState(generateUserId()); // Generate a unique user ID
  const [file, setFile] = useState(null);
console.log(chat);

  useEffect(() => {
    // Emit new user event
    socket.emit('new user', userId);

    // Listen for messages from the server
    socket.on('chat message', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Listen for file uploads from the server
    socket.on('file upload', (fileData) => {
      setChat((prevChat) => [...prevChat, fileData]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('chat message');
      socket.off('file upload');
    };
  }, [userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = { 
        id: Date.now(), 
        text: message, 
        sender: userId, 
        status: 'gönderildi',
        imageUrl: `http://localhost:2000/uploads/DSC_8786.JPG`
      }; // Attach sender info and message ID
      socket.emit('chat message', messageData); // Send message to server
      setMessage('');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendFile = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sender', userId); // Include sender information

      // Send the file to the server using the /upload endpoint
      try {
        const response = await fetch('http://localhost:2000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const fileData = await response.json();
          socket.emit('file upload', fileData); // Emit file data to Socket.IO
        } else {
          console.error('File upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }

      // Reset the file input
      setFile(null);
    }
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={msg.sender === userId ? 'message-right' : 'message-left'}>
            
            {msg.text ? (
              <div style={{backgroundColor:msg.sender === userId?"#4caf50":"#e0e0e0" ,minWidth:"130px",minHeight:"40px",borderRadius:"5px",padding:"5px",marginRight:"4px"}}>{msg.text}</div>
            ) : (
              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                {msg.filename} {/* Display the filename as a clickable link */}
              </a>
            )} 
            <img 
              src={msg.imageUrl} 
              className="user-avatar" 
              style={{ width: '40px', height: '40px', borderRadius: '50%' }} // Make avatar round
            />
            
          </div>
        ))}
      </div>
      <div className="chatSend">
        <form onSubmit={sendMessage}>
          <InputText
            style={{ width: "230px" }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button icon="pi pi-send" />
        </form>
       
      </div>
    </div>
  );
}

export default Chat;
