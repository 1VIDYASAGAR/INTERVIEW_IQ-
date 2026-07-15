const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const session = require("express-session");
const passport = require("./config/passport");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


//require all the routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter =require("./routes/interview.routes")

//uisng all the routes here
app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter)
app.get("/", (req, res) => {
    res.send("Backend is running successfully 🚀");
});


module.exports = app;