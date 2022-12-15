const app = require("./app");
const http = require("http").Server(app);
const mongoose = require("mongoose");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders:
      "X-Requested-With, content-type, x-access-token, Origin, Content-Type, Accept, Set-Cookie, Cookie",
    methods: ["GET", "POST", "DELETE"],
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
