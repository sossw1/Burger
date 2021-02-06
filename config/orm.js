const connection = require('./connection');

// Given num, return a stringified array of '?'s of length num
const printQuestionMarks = (num) => {
    let arr = [];
    for(let i=0; i<num; i++) {
        arr.push('?');
    }
    return arr.toString();
}

// Given object, return stringified array of key-value pairs
const objToSql = (obj) => {
    const arr = [];
    for(const key in obj) {
        let value = obj[key];
        if(Object.hasOwnProperty.call(obj,key)) {
            if(typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key}=${value}`);
        }
    }
    return arr.toString();
}

// Object-Relational Mapping
const orm = {

    // Select all rows from given table, then execute callback
    selectAll(table, cb) {
        const queryString = `SELECT * FROM ${table};`;
        connection.query(queryString, (err, result) => {
            if(err) throw err;
            cb(result);
        });
    },

    // Insert values into columns in a given table, then execute callback
    insertOne (table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`;
        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        connection.query(queryString, vals, (err, result) => {
            if(err) throw err;
            cb(result);
        });
    },

    /* Update the given columns where a condition is met in a given table,
       then execute callback */
    updateOne (table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table}`;
        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if(err) throw err;
            cb(result);
        });
    }
}

// Export the orm object for the model
module.exports = orm;