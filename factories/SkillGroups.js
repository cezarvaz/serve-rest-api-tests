import request from 'config/request';
import client from 'helpers/AuthClient';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
});

class SkillGroups {
  async create() {
    const payload = {
      skill_group: {
        name: `SkillGroup_${fakerBr.random.number({
          max: 999999999999,
        })}_criado pela automação de testes de API`,
      },
    };

    const { body } = await request
      .post('skill_groups')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(201);

    this.id = body.data.id;
  }

  async getSkillGroup() {
    const { body } = await request
      .get('skill_groups')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let skillGroupId = body.data[0].id;
    this.groupId = parseInt(skillGroupId);
  }
}

export default new SkillGroups();
