const AWS = require('aws-sdk')
const DocumentClient = new AWS.DynamoDB.DocumentClient()

const { NOTES_TABLE } = process.env

const a_note_is_created = async (id, note) => {
    return await DocumentClient.put({
        TableName: NOTES_TABLE,
        Item: {
            id: id,
            title: note.title,
            body: note.body
        }
    }).promise()
}

module.exports = {
    a_note_is_created
}