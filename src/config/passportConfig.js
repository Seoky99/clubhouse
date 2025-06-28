const db = require('../models/queries');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function configPassport(passport) {

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const userRows = await db.findUser(username);
                const user = userRows[0]; 
    
                if (!user) {
                    return done(null, false, { message: "Incorrect username or password."});
                }
    
                const match = await bcrypt.compare(password, user.password);
    
                if (!match) {
                    return done(null, false, { message: "Incorrect password or password."});
                }
    
                return done(null, user);
            } catch (err) {
                return done(err); 
            } 
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user.id); 
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const rows = await db.findUserById(id);
            const user = rows[0]; 
            done(null, user);
        } catch(err) {
            done(err);
        }
    });

}

module.exports = configPassport; 