import request from 'config/request';
import client from 'helper/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helper/Validate';
import skillgroup from 'test_data/SkillGroups';
import successSchema from 'schemas/skill_groups/put/success';
import expiredTokenSchema from 'schemas/skill_groups/put/expired_token';
import invalidNameSchema from 'schemas/skill_groups/put/invalid_name';

describe('Update a Group Criteria', () => {
  beforeAll(async () => {
    await client.auth();
  });
  test('successfully', async () => {
    const res = await request
      .put('skill_groups/' + skillgroup.id().successfuly_id)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(skillgroup.payload_put());
    expect(res.status).toBe(202);
    expect(res.body.data.id).toBe(skillgroup.id().successfuly_id);
    expect(res.body.data.type).toBe('skill_groups');
    expect(res.body.data.attributes.name).toBe(
      skillgroup.payload_put().skill_group.name
    );
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });
  test('expired token', async () => {
    const res = await request
      .put('skill_groups/' + skillgroup.id().successfuly_id)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN)
      .send(skillgroup.payload_put());
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
  test('null name', async () => {
    let payload = skillgroup.payload_put();
    payload.skill_group.name = null;
    const res = await request
      .put('skill_groups/' + skillgroup.id().successfuly_id)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(payload);
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser atualizado');
    expect(res.body.error.name[0]).toBe('Este campo não pode estar vazio');
    expect(validate.jsonSchema(res.body, invalidNameSchema)).toBe(true);
  });
  test('empty name', async () => {
    let payload = skillgroup.payload_put();
    payload.skill_group.name = '';
    const res = await request
      .put('skill_groups/' + skillgroup.id().successfuly_id)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(payload);
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser atualizado');
    expect(res.body.error.name[0]).toBe('Este campo não pode estar vazio');
    expect(validate.jsonSchema(res.body, invalidNameSchema)).toBe(true);
  });
  test('archiving group criteria', async () => {
    let payload = skillgroup.payload_put();
    payload.skill_group.active = false;
    const res = await request
      .put('skill_groups/' + skillgroup.id().successfuly_id)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(payload);
    expect(res.status).toBe(202);
    expect(res.body.data.id).toBe(skillgroup.id().successfuly_id);
    expect(res.body.data.type).toBe('skill_groups');
    expect(res.body.data.attributes.name).toBe(payload.skill_group.name);
    expect(res.body.data.attributes.archived).toBe(true);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });
});
