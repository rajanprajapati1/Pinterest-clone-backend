require('./passport');
const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');
const authRoutes = require('./route');

app.use(cors({
    origin : "http://localhost:5173",
    methods : "GET,PUT,POST,DELETE",
    credentials : true,
}))
app.use(cookieSession({
    name : "session",
    keys : ["MYNAMEISRAJANWEBDEV"],
    maxAge : 24 * 60* 60 *  1000,
}))
app.use((req, res, next) => {
    req.session = req.session || {};
    req.session.regenerate = req.session.regenerate || ((cb) => cb());
    req.session.save = req.session.save || ((cb) => cb());
    next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth",authRoutes)

app.listen("4000" ,()=>console.log(`Port No 4000`))