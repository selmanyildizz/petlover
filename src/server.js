const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Store user images
const userImages = {};

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
  },
});

const upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new user', (userId) => {
    // Assign a default image if the user is new
    userImages[userId] = 'http://localhost:4000/uploads/default_image.png'; // Use a default image
  });

  // Handle receiving a new chat message
  socket.on('chat message', (msg) => {
    const messageData = {
      text: msg.text,
      sender: msg.sender,
      imageUrl: userImages[msg.sender] || 'http://localhost:4000/uploads/default_image.png', // Fallback image
    };
    console.log('Sending messageData:', messageData); // Debugging log
    io.emit('chat message', messageData); // Send to all clients
  });

  // Handle file uploads
  socket.on('file upload', (fileData) => {
    console.log('Received file upload:', fileData); // Log uploaded file data
    io.emit('file upload', fileData); // Broadcast the file to all clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// HTTP POST endpoint for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req);
    
  const fileData = {
    filename: req.file.filename,
    sender: req.body.sender,
    imageUrl: userImages[req.body.sender] || 'http://localhost:4000/uploads/DSC_8786.JPG', // Fallback image
    fileUrl: `http://localhost:4000/uploads/${req.file.filename}`,
  };

  console.log('File uploaded successfully:', fileData); // Log file upload info
  io.emit('file upload', fileData); // Broadcast the file to all clients
  res.status(200).send(fileData); // Send response to client
});

// Start the server
const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
