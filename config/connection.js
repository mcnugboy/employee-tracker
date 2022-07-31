import mysql2 from 'mysql2';
import mysql from 'mysql';

const connection = mysql2.createConnection({
    host:'localhost',
    user: 'root',
    password: "",
    database: 'employeeDB'

});

export default connection;