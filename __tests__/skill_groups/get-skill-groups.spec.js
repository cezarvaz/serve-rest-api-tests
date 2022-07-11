import request from 'config/request';
import client from 'helper/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helper/Validate';
import successSchema from 'schemas/skill_groups/get/success';
import expiredTokenSchema from 'schemas/skill_groups/get/expired_token';
import nonExistentIdSchema from 'schemas/skill_groups/get/nonexistent_id';

let successfuly_id = 67;
let nonexistent_id = 999999;
let invalid_id = 'asda@sdasd';

describe('Get Group Criterias', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const res = await request
      .get('skill_groups/' + successfuly_id)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(successfuly_id);
    expect(res.body.data.type).toBe('skill_groups');
    expect(res.body.data.attributes.created_at).toBeDefined();
    expect(res.body.data.attributes.updated_at).toBeDefined();
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('expired token', async () => {
    const res = await request
      .get('skill_groups/' + successfuly_id)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });

  test('nonexistentent id', async () => {
    const res = await request
      .get('skill_groups/' + nonexistent_id)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.status).toBe(404);
    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Não pode ser mostrado');
    expect(validate.jsonSchema(res.body, nonExistentIdSchema)).toBe(true);
  });

  test('invalid id', async () => {
    const res = await request
      .get('skill_groups/' + invalid_id)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.status).toBe(404);
    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Não pode ser mostrado');
    expect(validate.jsonSchema(res.body, nonExistentIdSchema)).toBe(true);
  });
});