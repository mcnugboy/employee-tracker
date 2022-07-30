// const mysql2 = require('mysql2');
// const mysql = require('mysql');
import mysql2 from 'mysql2';
import mysql from 'mysql';

const connection = mysql2.createConnection({
    host:'localhost',
    user: 'root',
    password: "",
    database: 'employeeDB'

});

// module.exports = connection;
export default connection;