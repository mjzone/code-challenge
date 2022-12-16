"use strict";
const helper = require("./lib/helper");
const dynamodb = require("aws-sdk/clients/dynamodb");
const documentClient = new dynamodb.DocumentClient();
const { NOTES_TABLE } = process.env;

module.exports.handler = async (event) => {
  let { id } = event.pathParameters;
  let note = JSON.parse(event.body);
  if (!id || !note.title.length || !note.body.length) {
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
        ":title": note.title,
        ":body": note.body,
      },
      ConditionExpression: "attribute_exists(id)",
    };
    await documentClient.update(params).promise();
    return helper.respond(200, note);
  } catch (err) {
    console.log(err);
    return helper.respond(500, err.message);
  }
};
