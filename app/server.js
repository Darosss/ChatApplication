const app = require("./app");
const http = require("http").Server(app);
const mongoose = require("mongoose");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});
require("./socket")(socketIO);

//MONGODB database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

http.listen(process.env.BACKEND_PORT || 5000, () => {
  console.log(
    `application is running at: */${process.env.BACKEND_PORT || 5000}`
  );
});
