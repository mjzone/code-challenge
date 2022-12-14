"use strict";
const helper = require("./lib/helper");
const dynamodb = require("aws-sdk/clients/dynamodb");
const documentClient = new dynamodb.DocumentClient({ region: process.env.AWS_REGION });
const { NOTES_TABLE } = process.env;

module.exports.handler = async (event) => {
  try {
    const params = {
      TableName: NOTES_TABLE,
    };
    let results = await documentClient.scan(params).promise();
    return helper.respond(200, results);
  } catch (err) {
    return helper.respond(500, err.message);
  }
};
