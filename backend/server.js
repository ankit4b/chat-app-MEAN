const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is running");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/api/chat/:id", (req, res) => {
  console.log("Params : ", req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:4200",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log("userData : ", userData._id);
    socket.emit("Connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User join room : ", room);
  });

  socket.on("typing", (room) => {
    console.log("Typing : ", room);
    socket.in(room).emit("typing", room);
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    console.log("newMessageReceived : ", newMessageReceived);
    var chat = newMessageReceived.chat;
    console.log("chat : ", chat);

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});
