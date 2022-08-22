import request from 'config/request';
import client from 'helpers/AuthClient';

beforeAll(async () => {
  await client.auth();
});

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

  async getSkillsList() {
    const res = await request
      .get('skills')
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(200);

    let skillFirstId = res.body.data[0].id;
    this.skillId = parseInt(skillFirstId);
  }

  async getList() {
    const res = await request
      .get('skills')
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(200);

    let list = [];
    for (let i = 0; i < 5; i++) {
      if (res.body.data[i].type == 'skills') {
        list.push(res.body.data[i].id);
      }
    }

    this.skillsList = list;
  }

  async getSkillGroup() {
    const res = await request
      .get('skill_groups')
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(200);

    let skillGroupId = res.body.data[0].id;
    this.groupId = parseInt(skillGroupId);
  }

  async getDataToPut() {
    const res = await request
      .get('skills')
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(200);
    let dataJson = {
      skillId: res.body.data[0].id,
      groupId: res.body.data[0].relationships.skill_group.data.id,
    };
    this.data = dataJson;
  }

  postPayload(random_number, positionId, groupId) {
    const payload = {
      skill: {
        name: `${random_number}_criado pela automação`,
        description: 'random description',
        factor: 1,
        archived: true,
        skill_group_id: groupId,
        position_ids: positionId,
      },
    };

    return payload;
  }

  putPayload(random_number, positionId, groupId) {
    const payload = {
      skill: {
        name: `${random_number}_criado pela automação`,
        description: 'random description',
        factor: 1,
        archived: true,
        skill_group_id: groupId,
        position_ids: positionId,
      },
    };

    return payload;
  }
}

export default new Skills();
