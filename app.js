require('dotenv').config(); 

const express = require('express');
const path = require('node:path');
const passport = require('passport');
const session = require('./src/config/session')
const configPassport = require('./src/config/passportConfig'); 

const authRouter = require('./src/routes/authRouter');
const clubRouter = require('./src/routes/clubRouter');

const app = express(); 

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

configPassport(passport);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/auth", authRouter);
app.use("/clubhouse", clubRouter);

//later: check if authenticated, authorized 
app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/clubhouse");
    } else {
        res.render("landing-page")
    }}); 

app.listen(8080, () => {
    console.log("running!");
});