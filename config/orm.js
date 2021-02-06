const connection = require('./connection');

/*
    objToSql : given object, return stringified array of key-value pairs

    selectAll : SELECT * FROM table (chosen) then call cb on result
    
    insertOne : INSERT INTO table (stringified col) VALUES (given # ?'s)
        where ?'s later filled by key-value pairs from vals, then error or cb
    
    updateOne : UPDATE table (chosen) SET (objColVals in sql format)
        WHERE condition, then error or cb
*/

// Given num, return a stringified array of '?'s of length num
const printQuestionMarks = (num) => {
    let arr = [];
    for(let i=0; i<num; i++) {
        arr.push('?');
    }
    return arr.toString();
}

