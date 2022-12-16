require('../steps/init');
const when = require('../steps/when')
const chance = require('chance').Chance()

describe('When a new note is created', () => {
    it('Should return 201 with the note data that is created', async () => {
        const title = chance.sentence({ words: 3 });
        const body = chance.paragraph({ sentences: 2 });
        const res = await when.we_invoke_create_note({ title, body });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('body');
        expect(res.body.title).toEqual(title);
        expect(res.body.body).toEqual(body);
    })
});