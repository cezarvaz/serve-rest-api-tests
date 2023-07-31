import request from 'config/request';
import client from 'helpers/AuthClient';
import skillGroups from 'factories/SkillGroups';
import positions from 'factories/Positions';
import fakerBr from 'faker-br';

beforeAll(async () => {
  await client.auth();
  await positions.getPositionList();
  await skillGroups.getSkillGroup();
});

class Skills {
  async create() {
    const payload = {
      skill: {
        name: `Skill_${fakerBr.random.number({
          max: 999999999999,
        })}_criada pela automação de testes de API`,
        description: fakerBr.random.words(),
        factor: 1,
        archived: false,
        skill_group_id: skillGroups.groupId,
        position_ids: positions.positionIdList,
      },
    };

    const { body } = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload)
      .expect(201);

    this.id = body.data.id;
  }

  async getList() {
    const { body } = await request
      .get('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let list = [];
    for (let i = 0; i < body.data.length; i++) {
      if (body.data[i].type == 'skills') {
        list.push(body.data[i].id);
      }
    }

    this.skillsList = list;
  }

  async getDataToPut() {
    const { body } = await request
      .get('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let dataJson = {
      skillId: body.data[0].id,
      groupId: body.data[0].relationships.skill_group.data.id,
    };
    this.data = dataJson;
  }
}

export default new Skills();
