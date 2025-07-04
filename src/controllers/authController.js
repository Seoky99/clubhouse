const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../models/queries');
const passport = require('passport');

function signupGet(req, res) {
    res.render("signup-form");
}

function passwordConfirmation(value, {req}) {
    return value === req.body.password; 
}

async function userExists(value) {
    const rows = await db.findUser(value); 
    
    if (rows.length > 0) {
        throw new Error('There is already an user with this username.');
    }
}

//refactor! 
const validateUser = [
    body('fname').notEmpty().withMessage('Please enter your first name.').bail().isAlpha().withMessage('Please enter a valid first name').bail()
        .isLength({min: 2, max: 20}).withMessage('Please enter a valid length of name'),
    body('lname').notEmpty().withMessage('Please enter your last name.').bail().isAlpha().withMessage('Please enter a valid last name').bail()
        .isLength({min: 2, max: 20}).withMessage('Please enter a valid length of name'),
    body('username').notEmpty().withMessage('Please enter your username').bail()
        .custom(userExists),
    body('email').notEmpty().withMessage('Please enter your email.').bail().isEmail().withMessage('Please enter a valid email address').bail()
        .isLength({min: 6, max: 30}).withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Please enter your password'),
    body('confirm-password').notEmpty().withMessage('Please confirm your password.').custom(passwordConfirmation).withMessage('The passwords did not match!')
]; 

async function addUser(req, res, next) {

    const { username, password, fname, lname, email} = req.body;

    const result = validationResult(req); 

    if (!(result.isEmpty())) {
        return res.status(400).render("signup-form", { errors: result.array() });
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

function loginGet(req, res) {

    let error = '';

    if (req.session.messages) {
        error = req.session.messages[req.session.messages.length -1];
        req.session.messages = []; 
    }

    res.render('login-form', {error: error});
}

const loginPost = passport.authenticate("local", {
        successRedirect: '/clubhouse',
        failureRedirect: "/auth/login",
        failureMessage: true,
        }
);

function logout(req, res, next) {
    req.logout( (err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    }); 
}

async function deleteMessage(req, res) {
    await db.deleteMessage(req.body.message_id); 
    res.redirect("/clubhouse");
}

async function deleteSecretMessage(req, res) {
    await db.deleteSecretMessage(req.body.message_id); 
    res.redirect("/clubhouse/secret-club");
}

module.exports = { signupGet, signupPost, loginGet, loginPost, logout, deleteMessage, deleteSecretMessage};