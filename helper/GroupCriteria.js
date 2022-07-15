import request from 'config/request';
import client from 'helper/AuthClient';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
});

const number = fakerBr.random.number({ max: 5000 });

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
      successful_id: 67,
      nonexistent_id: 99999999,
      invalid_id: 'asda@sdasd',
    };
    return ids;
  }

  postPayload() {
    const payload = {
      skill_group: {
        name: `${number}_Teste_API`,
      },
    };
    return payload;
  }

  putPayload() {
    const payload = {
      skill_group: {
        name: `${number}_Teste_API`,
        archived: true,
      },
    };
    return payload;
  }
}

export default new GroupCriteria();
