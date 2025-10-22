const mysql= require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'airbnb',
    password: 'Arakhita@635',
    port: 3306,
});


module.exports = pool.promise();