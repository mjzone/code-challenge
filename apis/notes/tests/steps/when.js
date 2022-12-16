const NOTES_DIR = '../../'

const viaHandler = async (event, functionName) => {
    const handler = require(`${NOTES_DIR}/functions/${functionName}`).handler
    const context = {}
    const response = await handler(event, context)
    const headers = response?.headers || {}
    const contentType = headers['content-type'] || 'application/json'
    if (response?.body && contentType === 'application/json') {
        response.body = JSON.parse(response.body)
    }
    return response
}

const we_invoke_create_note = async (note) => {
    const body = JSON.stringify(note);
    return await viaHandler({ body }, 'createNote');
}

const we_invoke_update_note = async (id, note) => {
    const pathParameters = { id }
    const body = JSON.stringify(note);
    return await viaHandler({ pathParameters, body }, 'updateNote');
}

module.exports = {
    we_invoke_create_note,
    we_invoke_update_note
}