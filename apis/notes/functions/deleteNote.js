'use strict';
const helper = require("./lib/helper")

module.exports.handler = async (event) => {
    const result = { message: 'Delete Note.' };
    return helper.respond(200, result);
};

