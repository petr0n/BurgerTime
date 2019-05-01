// Import MySQL connection.
const connection = require('../config/connection.js');

function printQuestionMarks(num) {
  let arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  let arr = [];

  for (let key in ob) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = '"' + value + '"';
      }
      arr.push(key + '=' + value);
    }
  }
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(table, cb) {
    let qry = `SELECT * FROM ${table};`;
    connection.query(qry, function(err, result) {
      if (err) { throw err }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    let qry = `INSERT INTO ${table} (` + cols.toString() + `) VALUES (` + printQuestionMarks(vals.length) + `)`;
    
    console.log('insert qry', qry);
    
    connection.query(qry, vals, function(err, result) {
      if (err) { throw err }
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, id, cb) {
    let qry = `UPDATE ${table} SET ` + objToSql(objColVals) + ` WHERE id = ?`;
    
    console.log('update qry: ', qry);
    
    connection.query(qry, [id], function(err, result) {
      if (err) { throw err }
      cb(result);
    });
  },
  delete: function(table, id, cb) {
    let qry = `DELETE FROM ${table} WHERE id = ?`;
    
    console.log('delete qry: ', qry);    
    
    connection.query(qry, [id], function(err, result) {
      if (err) { throw err }
      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
