import request from 'config/request';
import client from 'helpers/AuthClient';

beforeAll(async () => {
  await client.auth();
});

class Positions {
  async getPositionList() {
    const res = await request
      .get('positions')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let list = [];
    for (let i = 0; i < res.body.data.length; i++) {
      if (res.body.data[i].type == 'positions') {
        list.push(res.body.data[i].id);
      }
    }

    this.positionIdList = list;
  }
}

export default new Positions();
