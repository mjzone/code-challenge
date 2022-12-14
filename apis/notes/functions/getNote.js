"use strict";
const helper = require("./lib/helper");
const dynamodb = require("aws-sdk/clients/dynamodb");
const documentClient = new dynamodb.DocumentClient({ region: process.env.AWS_REGION });
const { NOTES_TABLE } = process.env;

module.exports.handler = async (event) => {
  let { id } = event.pathParameters;
  try {
    const params = {
      TableName: NOTES_TABLE,
      Key: { id }
    };
    let result = await documentClient.get(params).promise();
    return helper.respond(200, result);
  } catch (err) {
    return helper.respond(500, err.message);
  }
};
