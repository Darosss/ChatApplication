const app = require("./app");
const http = require("http").Server(app);
const mongoose = require("mongoose");

//MONGODB database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
require("./socket")(socketIO);

http.listen(process.env.PORT || 5000, () => {
  // console.log(`application is running at: */${process.env.PORT || 5000}`);
});
