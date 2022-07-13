import request from 'config/request';
import client from 'helper/AuthClient';
import skillGroup from 'test_data/SkillGroups';

beforeAll(async () => {
  await client.auth();
});

class GroupCriteria {
  async create() {
    const res = await request
      .post('skill_groups')
      .send(skillGroup.postPayload())
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(201);

    this.id = res.body.data.id;
  }
}

export default new GroupCriteria();
