"use strict";
const { v4: uuidv4 } = require("uuid");
const helper = require("./lib/helper");
const dynamodb = require("aws-sdk/clients/dynamodb");
const documentClient = new dynamodb.DocumentClient({ region: process.env.AWS_REGION });
const { NOTES_TABLE } = process.env;

module.exports.handler = async (event) => {
  let data = JSON.parse(event.body);
  if (!data.title.length || !data.body.length) {
    return helper.respond(400, "Title and body must NOT be empty");
  }
  try {
    const params = {
      TableName: NOTES_TABLE,
      Item: {
        id: uuidv4(),
        title: data.title,
        body: data.body,
        createdAt: new Date().toJSON(),
      },
      ConditionExpression: "attribute_not_exists(id)",
    };
    await documentClient.put(params).promise();
    return helper.respond(201, `Note with id ${params.Item.id} is created!`);
  } catch (err) {
    return helper.respond(500, err.message);
  }
};
