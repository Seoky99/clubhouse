const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '..', '.env') });

const pool = require('./pool');


const tableCreation = 
`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    fname TEXT, 
    lname TEXT, 
    member_status BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER,
    title TEXT,
    text TEXT, 
    time DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`;

async function populateDB() {
    try {
        pool.query(tableCreation);
    } catch (err) {
        console.log(err);
    } finally {
        pool.end(); 
    }
}

populateDB(); 