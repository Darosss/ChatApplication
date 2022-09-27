if (process.env.NODE_ENV !== "producuction") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer);

const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
//socket io functions in another file for readability
require("./socket")(io);

//View engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Static folder
app.use(express.static(__dirname + "/public"));
//Body parser
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//MONGODB database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

//Routes(later login logout)
app.use("/", indexRouter);

//Listen port
httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`application is running at: */${process.env.PORT || 3000}`);
});
