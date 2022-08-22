import request from 'config/request';
import client from 'helpers/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helpers/Validate';
import successSchema from 'schemas/skills/post/success';
import expiredTokenSchema from 'schemas/skills/post/expired_token';
import emptyNameSchema from 'schemas/skills/post/empty_name';
import skills from 'factories/Skills';
import fakerBr from 'faker-br';

describe('Edit skill', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.getPositionList();
    await skills.getSkillGroup();
    await skills.getDataToPut();
  });

  let randomNumber;

  beforeEach(async () => {
    randomNumber = fakerBr.random.number({ max: 999999999999 });
  });

  test('successfully archived', async () => {
    let randomNumber = fakerBr.random.number({ max: 999999999 });
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = `${randomNumber}__editado pela automação`;
    payload.skill.archived = false;
    payload.skill.skill_group_id = skills.data.groupId;

    const res = await request
      .put(`skills/${skills.data.skillId}`)
      .send(payload)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(202);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('unsuccessfully with null name', async () => {
    let randomNumber = fakerBr.random.number({ max: 999999999 });
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = null;
    payload.skill.skill_group_id = skills.data.groupId;

    const res = await request
      .put(`skills/${skills.data.skillId}`)
      .send(payload)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(validate.jsonSchema(res.body, emptyNameSchema)).toBe(true);
  });

  test('expired token', async () => {
    let randomNumber = fakerBr.random.number({ max: 999999999 });
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.archived = false;
    payload.skill.skill_group_id = skills.data.groupId;

    const res = await request
      .put(`skills/${skills.data.skillId}`)
      .send(payload)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
});
