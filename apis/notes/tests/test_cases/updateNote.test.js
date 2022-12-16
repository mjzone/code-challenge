require('../steps/init');
const given = require('../steps/given');
const when = require('../steps/when');
const chance = require('chance').Chance()

describe('Given a note is created', () => {
    const id = chance.guid();
    const note = {
        title: chance.sentence({ words: 3 }),
        body: chance.paragraph({ sentences: 2 })
    };

    beforeAll(async () => {
        await given.a_note_is_created(id, note);
    });

    it('Should return 200 when the note title and body are updated', async () => {
        const title = chance.sentence({ words: 3 });
        const body = chance.paragraph({ sentences: 2 });
        const res = await when.we_invoke_update_note(id, { title, body });
        
        expect(res.statusCode).toEqual(200);
    })
});