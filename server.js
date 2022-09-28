if (process.env.NODE_ENV !== "producuction") {
  require("dotenv").config();
}
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const indexRouter = require("./routes/index");
const profilRouter = require("./routes/profil");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
//socket io functions in another file for readability
require("./socket")(io);

//MONGODB database connection
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", true);
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifedTopology", true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

//View engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
//Static folder
app.use(express.static(__dirname + "/public"));
//Body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  require("express-session")({
    secret: "Thats secret kappa",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//Routes(later login logout)
app.use("/", indexRouter);
app.use("/profil", profilRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

//Listen port
httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`application is running at: */${process.env.PORT || 3000}`);
});
