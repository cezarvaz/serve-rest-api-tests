import request from 'config/request';
import client from 'helpers/AuthClient';

beforeAll(async () => {
  await client.auth();
});

class SkillGroups {
  async getSkillGroup() {
    const res = await request
      .get('skill_groups')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let skillGroupId = res.body.data[0].id;
    this.groupId = parseInt(skillGroupId);
  }
}

export default new SkillGroups();
