// Import ORM to create functions that will interact with the database
const orm = require('../config/orm');

const burger = {
    selectAll(cb) {
        orm.selectAll('burgers', (res) => cb(res));
    },
    insertOne(cols, vals, cb) {
        orm.create('burgers', cols, vals, (res) => cb(res));
    },
    updateOne(objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, (res) => cb(res));
    }
};

// Export the database functions for the controller
module.exports = burger;