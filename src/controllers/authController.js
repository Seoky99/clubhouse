const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../models/queries');

function signupGet(req, res) {
    res.render("signup-form");
}

const validateUser = [
    body('fname').notEmpty().withMessage('Please enter your first name.').isAlpha().withMessage('Please enter a valid first name')
        .isLength({min: 2, max: 20}).withMessage('Please enter a valid length of name'),
    body('lname').notEmpty().withMessage('Please enter your first name.').isAlpha().withMessage('Please enter a valid last name')
        .isLength({min: 2, max: 20}).withMessage('Please enter a valid length of name'),
    body('username').notEmpty().withMessage('Please enter your username'), //TODO: implement checking if a username already exists 
    body('email').notEmpty().withMessage('Please enter your email.').isEmail().withMessage('Please enter a valid email address')
        .isLength({min: 6, max: 30}).withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Please enter your password'),
    body('confirm-password').notEmpty().withMessage('Please confirm your password.')
]; 

async function addUser(req, res, next) {

    const { username, password, fname, lname, email} = req.body;

    //use validation result 

    const errors = validationResult(req.body); 

    if (!errors.isEmpty()) {
        res.status(400).send("duMBASS");
    }

    try { 
        const hashed = await bcrypt.hash(password, 10);
        db.addUser(username, hashed, fname, lname, email, false);
        res.redirect("/");

    } catch (err) {
        return next(err);
    } 
}

const signupPost = [ validateUser, addUser ]; 

module.exports = { signupGet, signupPost };