'use strict';
const helper = require("./lib/helper");
const dynamodb = require("aws-sdk/clients/dynamodb");
const dynamodbClient = new dynamodb.DocumentClient({ region: process.env.AWS_REGION });

module.exports.handler = async (event) => {
  console.log("regions =>", process.env.AWS_REGION);
  const result = { message: 'GET Note.' };
  return helper.respond(200, result);
};