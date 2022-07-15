import request from 'config/request';
import client from 'helper/AuthClient';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
});

const valid_id = fakerBr.random.number({ max: 5000 });
const invalid_id = fakerBr.random.words();
const nonexistent_number = fakerBr.random.number({ min: 99999 });

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
      nonexistent_id: nonexistent_number,
      invalid_id: invalid_id,
    };
    return ids;
  }

  postPayload() {
    const payload = {
      skill_group: {
        name: `${valid_id}_Teste_API`,
      },
    };
    return payload;
  }

  putPayload() {
    const payload = {
      skill_group: {
        name: `${valid_id}_Teste_API`,
        archived: true,
      },
    };
    return payload;
  }
}

export default new GroupCriteria();
