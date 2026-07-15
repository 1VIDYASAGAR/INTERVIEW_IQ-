const express = require("express");
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authRouter =express.Router();
/**
//  * @route POST/api/register
//  * @description  Register a new user
//  * @access Public
//  */
// authRouter.post("/register",authController.registerUserController)

// /**
//  * @routes POST/api/auth/login
//  * @description login user with email and pass
//  * @access Public
//  */

// authRouter.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear the cookie and logout the user and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)


// Google Login
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google Callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
   failureRedirect: "https://interview-iq-1-ojzj.onrender.com/login",
    session: false,
  }),
  (req, res) => {

    const token = jwt.sign(
      {
        id: req.user._id,
        username: req.user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

   res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});

   res.redirect("https://interview-iq-1-ojzj.onrender.com/");
  }
);

module.exports = authRouter