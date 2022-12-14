'use strict';
const helper = require("./lib/helper")

module.exports.handler = async (event) => {
    const result = { message: 'Update Note.' };
    return helper.respond(200, result);
};