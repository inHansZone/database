const sql = require('msnodesqlv8');

const connectionString = ///////////////// thay 'localhost' 'test' thành server, tên database
  'Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=test;Trusted_Connection=yes;';

/**
 * Opens a database connection.
 * @returns {Promise} Resolves with the connection object or rejects with an error.
 */
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    sql.open(connectionString, (err, conn) => {
      if (err) {
        reject(err);
      } else {
        resolve(conn);
      }
    });
  });
};

module.exports = { connectToDatabase };