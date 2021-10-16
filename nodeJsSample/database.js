const mysql = require('mysql');

const connection = mysql.createConnection({
 host: 'localhost',
user: 'root',
password: 'root',
database: 'mydb'
});

connection.connect((err) => {
    if(err) {
        throw err.message;
    }
    console.log('connected');
});

// connection.query("CREATE DATABASE mydb", function(err, result) {
//     if(err) throw err;
//     console.log('database created');
// });

// connection.query("CREATE TABLE Contacts (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255), age INT)");
// connection.query("INSERT INTO Contacts (first_name, last_name, age) VALUES ('Jane', 'Doe', 19) ");
connection.query("INSERT INTO Contacts (first_name, last_name, age) VALUES ('Sue', 'Smith', 42) ");

// connection.query("SELECT * FROM Contacts", function(err, result, fields) {
//     if(err) throw err;
//     console.log(result);
// });