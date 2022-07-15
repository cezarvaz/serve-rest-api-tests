import request from 'config/request';
import client from 'helper/AuthClient';
import groupCriteria from 'helper/GroupCriteria';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helper/Validate';
import successSchema from 'schemas/skill_groups/put/success';
import expiredTokenSchema from 'schemas/skill_groups/put/expired_token';
import invalidNameSchema from 'schemas/skill_groups/put/invalid_name';

describe('Update a Group Criteria', () => {
  beforeAll(async () => {
    await client.auth();
    await groupCriteria.create();
  });

  test('successfully', async () => {
    const res = await request
      .put('skill_groups/' + groupCriteria.id)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(groupCriteria.putPayload());

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(202);
    expect(res.body.data.id).toBe(groupCriteria.id);
    expect(res.body.data.type).toBe('skill_groups');
    expect(res.body.data.attributes.name).toBe(
      groupCriteria.putPayload().skill_group.name
    );

    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('expired token', async () => {
    const res = await request
      .put('skill_groups/' + groupCriteria.id)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN)
      .send(groupCriteria.putPayload());

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);

    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });

  test('null name', async () => {
    let payload = groupCriteria.putPayload();
    payload.skill_group.name = null;

    const res = await request
      .put('skill_groups/' + groupCriteria.id)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(payload);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser atualizado');
    expect(res.body.error.name[0]).toBe('Este campo não pode estar vazio');
    expect(validate.jsonSchema(res.body, invalidNameSchema)).toBe(true);
  });

  test('empty name', async () => {
    let payload = groupCriteria.putPayload();
    payload.skill_group.name = '';

    const res = await request
      .put('skill_groups/' + groupCriteria.id)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(payload);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser atualizado');
    expect(res.body.error.name[0]).toBe('Este campo não pode estar vazio');

    expect(validate.jsonSchema(res.body, invalidNameSchema)).toBe(true);
  });

  test('archiving group criteria', async () => {
    let payload = groupCriteria.putPayload();
    payload.skill_group.active = false;

    const res = await request
      .put('skill_groups/' + groupCriteria.id)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(payload);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(202);
    expect(res.body.data.id).toBe(groupCriteria.id);
    expect(res.body.data.type).toBe('skill_groups');
    expect(res.body.data.attributes.name).toBe(payload.skill_group.name);
    expect(res.body.data.attributes.archived).toBe(true);

    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });
});
