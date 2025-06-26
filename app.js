require('dotenv').config(); 

const express = require('express');
const path = require('node:path');

const app = express(); 

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.render("landing-page"));

app.listen(8080, () => {
    console.log("running!");
});