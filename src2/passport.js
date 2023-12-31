const passport = require('passport');
// google auth
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = "1056679556743-gg2qp9ijk3n7hd4b445t7taubsfg79ii.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    (accesstoken, refreshtoken, profile, done) => {
        done(null, profile)
    }
))

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

