const connection = require('./connection');

/*
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

// given object, return stringified array of key-value pairs
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

