require('./passport');
const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');
const authrouth = require('./routers/auth')

app.use(cors({
    origin: "http://localhost:5173",
    methods: "POST ,GET ,PUT ,DELETE",
    credentials: true,
}));
app.use(cookieSession({
    name: 'session',
    keys: ['RAJANPRAJAPATI'],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use((req, res, next) => {
    req.session = req.session || {};
    req.session.regenerate = req.session.regenerate || ((cb) => cb());
    req.session.save = req.session.save || ((cb) => cb());
    next();
});
app.use(passport.initialize())
app.use(passport.session())
app.use("/auth",authrouth)
app.listen("4000", () => {
    console.log(`Server Running on Port no 4000`)
})