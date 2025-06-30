const e = require('express');
const db = require('../models/queries');

async function clubGet (req, res) {
    const messages = await db.getMessages();

    res.render("clubhouse", {messages});
}

function clubWriteGet(req, res) {
    res.render("new-message", {isSecret: false});
}

async function clubWritePost(req, res) {

    const { title, text } = req.body; 

    const userid = req.user.id; 

    try {
        await db.addMessage(userid, title, text, Date.now()); 
        res.redirect('/clubhouse');
    } catch(err) {
        console.log(err);
    } 
}

async function secretGet(req, res) {
    const messages = await db.getSecretMessages();
    res.render("secret-club", {secret_messages: messages});
}

async function secretPost(req, res) {

    const { passcode } = req.body;

    if (passcode === 'seokyiscool') {
        await db.makeMember(req.user.id);
        res.redirect('/clubhouse/secret-club');
    } else {
        res.render('secret-club', {wrongAttempt: true});
    }
}

function secretClubWriteGet(req, res) {
    res.render("new-message", {isSecret: true});
}

async function secretClubWritePost(req, res) {

    const { title, text } = req.body; 

    const userid = req.user.id; 

    try {
        await db.addSecretMessage(userid, title, text, Date.now()); 
        res.redirect('/clubhouse/secret-club');
    } catch(err) {
        console.log(err);
    } 
}

module.exports = { clubGet, clubWriteGet, clubWritePost, secretGet, secretPost, secretClubWriteGet,
    secretClubWritePost }; 