"use strict";
const { v4: uuidv4 } = require("uuid");
const helper = require("./lib/helper");
const dynamodb = require("aws-sdk/clients/dynamodb");
const documentClient = new dynamodb.DocumentClient();
const { NOTES_TABLE } = process.env;

module.exports.handler = async (event) => {
  let note = JSON.parse(event.body);
  if (!note.title.length || !note.body.length) {
    return helper.respond(400, "Title and body must NOT be empty");
  }
  try {
    note.id = uuidv4();
    const params = {
      TableName: NOTES_TABLE,
      Item: {
        id: note.id,
        title: note.title,
        body: note.body,
        createdAt: new Date().toJSON(),
      },
      ConditionExpression: "attribute_not_exists(id)",
    };
    await documentClient.put(params).promise();
    return helper.respond(201, note);
  } catch (err) {
    console.log(err);
    return helper.respond(500, err.message);
  }
};
