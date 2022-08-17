import request from 'config/request';
import client from 'helpers/AuthClient';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
});

const randomNumber = fakerBr.random.number({ max: 999999999999 });
const invalidId = fakerBr.random.words();
const nonexistentNumber = fakerBr.random.number({ min: 99999 });

class GroupCriteria {
  async create() {
    const res = await request
      .post('skill_groups')
      .send(this.postPayload())
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(201);

    this.id = res.body.data.id;
  }

  ids() {
    const ids = {
      nonexistent_id: nonexistentNumber,
      invalid_id: invalidId,
    };
    return ids;
  }

  postPayload() {
    const payload = {
      skill_group: {
        name: `${randomNumber}_Teste_API`,
      },
    };
    return payload;
  }

  putPayload() {
    const payload = {
      skill_group: {
        name: `${randomNumber}_Teste_API`,
        archived: true,
      },
    };
    return payload;
  }
}

export default new GroupCriteria();
