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


module.exports = { addUser };