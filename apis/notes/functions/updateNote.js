"use strict";
const helper = require("./lib/helper");
const dynamodb = require("aws-sdk/clients/dynamodb");
const documentClient = new dynamodb.DocumentClient({ region: process.env.AWS_REGION });
const { NOTES_TABLE } = process.env;

module.exports.handler = async (event) => {
  let { id } = event.pathParameters;
  let data = JSON.parse(event.body);
  if (!id || !data.title.length || !data.body.length) {
    return helper.respond(400, "Id, title and body must NOT be empty");
  }
  try {
    const params = {
      TableName: NOTES_TABLE,
      Key: { id },
      UpdateExpression: "set #title  = :title, #body = :body",
      ExpressionAttributeNames: {
        "#title": "title",
        "#body": "body",
      },
      ExpressionAttributeValues: {
        ":title": data.title,
        ":body": data.body,
      },
      ConditionExpression: "attribute_exists(id)",
    };
    await documentClient.update(params).promise();
    return helper.respond(200, `Note with id ${id} is updated!`);
  } catch (err) {
    return helper.respond(500, err.message);
  }
};
