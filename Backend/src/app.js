const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const session = require("express-session");
const passport = require("./config/passport");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://interview-iq-f.onrender.com"
  ],
  credentials: true,
}));



app.use(passport.initialize());

// app.use(passport.session());



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