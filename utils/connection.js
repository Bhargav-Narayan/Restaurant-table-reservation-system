var mysql = require('mysql'); // Require mysql module

// Setup mysql connection. 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user_name',
    password: 'password',
    database: 'restaurants'
});

// Establish mysql connection
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
