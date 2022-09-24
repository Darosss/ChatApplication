if (process.env.NODE_ENV !== "producuction") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
