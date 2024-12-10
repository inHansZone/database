const { connectToDatabase } = require('../config/db');

/**
 * Fetches all rows from a specified table.
 * @param {string} tableName - The name of the table to query.
 * @returns {Promise} Resolves with the query results or rejects with an error.
 */
const getDataFromTable = async (tableName) => {
  const query = `SELECT * FROM ${tableName}`;

  try {
    const conn = await connectToDatabase();
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        conn.close();

        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (err) {
    throw new Error(`Database connection failed: ${err.message}`);
  }
};

/**
 * Inserts data into a specified table.
 * @param {string} tableName - The name of the table to insert data into.
 * @param {Object} data - The data to insert.
 * @returns {Promise} Resolves with a success message or rejects with an error.
 */
const insertDataIntoTable = async (tableName, data) => {
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data)
    .map(value => (typeof value === 'string' ? `N'${value.replace(/'/g, "''")}'` : value)) // Escape single quotes in strings
    .join(', ');

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

  try {
    const conn = await connectToDatabase();
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        conn.close();

        if (err) {
          reject(err);
        } else {
          resolve('Data inserted successfully');
        }
      });
    });
  } catch (err) {
    throw new Error(`Database connection failed: ${err.message}`);
  }
};

/**
 * Updates a row in a specified table by its ID.
 * @param {string} tableName - The name of the table to update.
 * @param {number} product_id - The ID of the row to update.
 * @param {Object} updatedData - The updated data.
 * @returns {Promise} Resolves with a success message or rejects with an error.
 */
const updateRowInTable = async (tableName, product_id, updatedData) => {
  // Create the SET clause for the SQL query
  const setClause = Object.entries(updatedData)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        // Escape dấu nháy đơn trong chuỗi và thêm N prefix
        return `${key} = N'${value.replace(/'/g, "''")}'`;
      }
      return `${key} = ${value === null ? 'NULL' : value}`; // Xử lý null và giá trị khác
    })
    .join(', ');

  const query = `UPDATE ${tableName} SET ${setClause} WHERE product_id = ${product_id}`;

  try {
    const conn = await connectToDatabase();
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        conn.close();

        if (err) {
          reject(err);
        } else {
          resolve('Row updated successfully');
        }
      });
    });
  } catch (err) {
    throw new Error(`Database connection failed: ${err.message}`);
  }
};

const deleteDataFromTable = async (tableName, product_id) => {
  const query = `DELETE FROM ${tableName} WHERE product_id = ${product_id}`;

  try {
      const conn = await connectToDatabase();
      return new Promise((resolve, reject) => {
          conn.query(query, (err, result) => {
              conn.close();

              if (err) {
                  reject(err);
              } else {
                  resolve('Data deleted successfully');
              }
          });
      });
  } catch (err) {
      throw new Error(`Database connection failed: ${err.message}`);
  }
};

module.exports = { getDataFromTable, insertDataIntoTable, updateRowInTable, deleteDataFromTable };
