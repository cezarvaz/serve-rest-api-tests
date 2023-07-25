import request from 'config/request';
import client from 'helpers/AuthClient';

beforeAll(async () => {
  await client.auth();
});

class Skills {
  async getSkillsList() {
    const res = await request
      .get('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let skillFirstId = res.body.data[0].id;
    this.skillId = parseInt(skillFirstId);
  }

  async getList() {
    const res = await request
      .get('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let list = [];
    for (let i = 0; i < res.body.data.length; i++) {
      if (res.body.data[i].type == 'skills') {
        list.push(res.body.data[i].id);
      }
    }

    this.skillsList = list;
  }

  async getDataToPut() {
    const res = await request
      .get('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let dataJson = {
      skillId: res.body.data[0].id,
      groupId: res.body.data[0].relationships.skill_group.data.id,
    };
    this.data = dataJson;
  }
}

export default new Skills();
