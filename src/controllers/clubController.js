const db = require('../models/queries');

async function clubGet (req, res) {
    const messages = await db.getMessages();
    res.render("clubhouse", {messages});
}

function clubWriteGet(req, res) {
    res.render("new-message");
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


module.exports = { clubGet, clubWriteGet, clubWritePost }; 