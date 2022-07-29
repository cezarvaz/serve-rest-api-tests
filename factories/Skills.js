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

  async getSkillGroup() {
    const res = await request
      .get('skill_groups')
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(200);

    let skillGroupId = res.body.data[0].id;
    this.groupId = parseInt(skillGroupId);
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
}

export default new Skills();
