import request from 'config/request';
import client from 'helpers/AuthClient';
import groupCriteria from 'factories/GroupCriteria';
import validate from 'helpers/Validate';
import successSchema from 'schemas/skill_groups/get/success';
import nonExistentIdSchema from 'schemas/skill_groups/get/nonexistent-id';

describe('Get Group Criterias', () => {
  beforeAll(async () => {
    await client.auth();
    await groupCriteria.create();
  });

  test('successfully', async () => {
    const res = await request
      .get('skill_groups/' + groupCriteria.id)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(groupCriteria.id);
    expect(res.body.data.type).toBe('skill_groups');
    expect(res.body.data.attributes.created_at).toBeDefined();
    expect(res.body.data.attributes.updated_at).toBeDefined();

    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  // test('expired token', async () => {
  //   const res = await request
  //     .get('skill_groups/' + groupCriteria.id)
  //     .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

  //   expect(res.headers).toHaveProperty(
  //     'content-type',
  //     'application/json; charset=utf-8'
  //   );
  //   expect(res.status).toBe(401);

  //   expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  // });

  test('nonexistentent id', async () => {
    const res = await request
      .get('skill_groups/' + groupCriteria.ids().nonexistent_id)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(404);
    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Não pode ser mostrado');

    expect(validate.jsonSchema(res.body, nonExistentIdSchema)).toBe(true);
  });

  test('invalid id', async () => {
    const res = await request
      .get('skill_groups/' + groupCriteria.ids().invalid_id)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(404);
    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Não pode ser mostrado');

    expect(validate.jsonSchema(res.body, nonExistentIdSchema)).toBe(true);
  });
});
