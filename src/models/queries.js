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



module.exports = { addUser, findUser, findUserById };