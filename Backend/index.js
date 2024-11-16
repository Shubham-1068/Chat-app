require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const { mongoConnect } = require("./src/connection/mongoConnect");
const userChat = require("./src/model/userChat");

mongoConnect(process.env.mongoURL);

const router = require("./src/routes/userChats");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("message", async (data) => {
    const msg = await userChat.create({
      message: data.message,
      sender: data.sender,
    });

    console.log(msg);

    const chatHistory = await userChat.find({});
    io.emit("history", chatHistory);
  });
});

app.use("/chats", router);

server.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
