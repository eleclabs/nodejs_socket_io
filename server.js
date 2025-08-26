const express = require("express");
const path = require("path");
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));

// สร้าง Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*",   // อนุญาตทุก origin (หรือระบุ domain ที่ต้องการ)
  }
});


// จัดการการเชื่อมต่อของ client
io.on('connection', (socket) => {
  console.log('ผู้ใช้เชื่อมต่อ:', socket.id);

  // รับข้อความจาก client
  socket.on('chat message', (msg) => {
    console.log('ข้อความจาก client:', msg);
    // ส่งต่อให้ client ทุกคน
    io.emit('chat message', msg);
  });

  // เมื่อ client ตัดการเชื่อมต่อ
  socket.on('disconnect', () => {
    console.log('ผู้ใช้ตัดการเชื่อมต่อ:', socket.id);
  });
});




app.get("/", (req, res) => {
  //res.send("Hello from Node.js in Docker!");
  res.sendFile(path.join(__dirname, "templates/index.html"));
  console.log("แสดงหน้าแรก");
});


app.get("/profile", (req, res) => {
  //res.send("โดย สมเกียรติ ใจดี");
  res.sendFile(path.join(__dirname, "templates/profile.html"));
});

app.get("/about", (req, res) => {
  //res.send("เกี่ยวกับเรา");
   res.sendFile(path.join(__dirname, "templates/about.html"));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

