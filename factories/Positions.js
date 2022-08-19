import client from 'helpers/AuthClient';
beforeAll(async () => {
  await client.auth();
});

class Positions {
  putPayload(id) {
    const payload = {
      position: {
        skill_ids: [id],
      },
    };

    return payload;
  }
}

export default new Positions();
