const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userModel = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://interview-iq-ppv9.onrender.com/api/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({
          email: profile.emails[0].value,
        });

        if (!user) {
          user = await userModel.create({
            username: profile.displayName,
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
            picture: profile.photos?.[0]?.value || null,
            provider: "google",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

module.exports = passport;