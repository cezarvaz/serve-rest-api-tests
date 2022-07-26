import request from 'config/request';
import client from 'helper/AuthClient';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
});

const random_number = fakerBr.random.number({ max: 5000 });
// const invalid_id = fakerBr.random.words();
// const nonexistent_number = fakerBr.random.number({ min: 99999 });

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
        name: `${random_number}_criado pela automação`,
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
