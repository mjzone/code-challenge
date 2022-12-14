"use strict";
const helper = require("./lib/helper");
const dynamodb = require("aws-sdk/clients/dynamodb");
const documentClient = new dynamodb.DocumentClient({ region: process.env.AWS_REGION });
const { NOTES_TABLE } = process.env;

module.exports.handler = async (event) => {
  let { id } = event.pathParameters;
  if (!id) {
    return helper.respond(400, "Note id must NOT be empty");
  }
  try {
    const params = {
      TableName: NOTES_TABLE,
      Key: { id },
      ConditionExpression: "attribute_exists(id)",
    };
    await documentClient.delete(params).promise();
    return helper.respond(200, `Note with id ${id} is deleted!`);
  } catch (err) {
    return helper.respond(500, err.message);
  }
};
