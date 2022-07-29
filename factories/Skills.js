import request from 'config/request';
import client from 'helpers/AuthClient';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
});

const randomNumber = fakerBr.random.number({ max: 5000 });
// const invalidId = fakerBr.random.words();
// const nonexistentNumber = fakerBr.random.number({ min: 99999 });

class Skills {
  async getPositionList() {
    const res = await request
      .get('positions')
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(200);

    let list = [];
    for (let i = 0; i < 5; i++) {
      if (res.body.data[i].type == 'positions') {
        list.push(res.body.data[i].id);
      }
    }
    this.positionIdList = list;
  }

  postPayload(positionIdList) {
    const payload = {
      skill: {
        name: `${randomNumber}_criado pela automação`,
        description: 'random description',
        factor: 1,
        archived: true,
        skill_group_id: 67,
        position_ids: positionIdList,
      },
    };

    return payload;
  }
}

export default new Skills();
