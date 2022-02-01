const mysql = require('mysql2');

class Database {
  getConnection() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rikox100pre',
      database: 'teacher'
    });
    return connection;
  }

}
module.exports = Database;


