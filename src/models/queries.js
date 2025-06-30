const pool = require('./pool');

async function addUser(username, password, fname, lname, email, member_status) {
    const query = `INSERT INTO users (username, password, fname, lname, email, member_status) 
        VALUES ($1, $2, $3, $4, $5, $6)`;
    
    try {
        await pool.query(query, [username, password, fname, lname, email, member_status]);
    } catch(err) {
        console.log(err);
    }
}

async function findUser(username) {
    const query = `SELECT * FROM users WHERE username = $1`;
    try {
        const { rows } = await pool.query(query, [username]);
        return rows; 
    } catch(err) {
        console.log(err); 
    }
}

async function findUserById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    try {
        const { rows } = await pool.query(query, [id]);
        return rows; 
    } catch(err) {
        console.log(err); 
    }
}

async function addMessage(userid, title, text, date) {
    const query = `INSERT INTO messages(user_id, title, text, time) 
                   VALUES ($1, $2, $3, to_timestamp($4))`;

    try {
        await pool.query(query, [userid, title, text, date/1000.0]);
    } catch(err) {
        console.log(err);
    }
}

async function addSecretMessage(userid, title, text, date) {
    const query = `INSERT INTO secret_messages(user_id, title, text, time) 
                   VALUES ($1, $2, $3, to_timestamp($4))`;

    try {
        await pool.query(query, [userid, title, text, date/1000.0]);
    } catch(err) {
        console.log(err);
    }
}

async function getMessages() {
    const query = `SELECT username, title, text, time FROM messages 
                   INNER JOIN users ON user_id = id`;
    
    try { 
        const {rows} = await pool.query(query); 
        return rows; 
    }   catch(err) { 
        console.log(err);
    }
}

async function getSecretMessages() {
    const query = `SELECT username, title, text, time FROM secret_messages 
                   INNER JOIN users ON user_id = id`;
    
    try { 
        const {rows} = await pool.query(query); 
        return rows; 
    }   catch(err) { 
        console.log(err);
    }
}

async function makeMember(userid) {
    const query = `UPDATE users SET member_status = true WHERE id = $1`;
    
    try { 
        await pool.query(query, [userid]); 
    }   catch(err) { 
        console.log(err);
    }
}


module.exports = { addUser, findUser, findUserById, addMessage, addSecretMessage, getMessages, getSecretMessages, makeMember };