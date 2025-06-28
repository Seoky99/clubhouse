const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('../models/pool');

module.exports = session({
    store: new pgSession({
        pool: pool, 
        createTableIfMissing: true 
    }),
    secret: process.env.SECRET,
    saveUninitialized: true, 
    resave: false, 
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
});