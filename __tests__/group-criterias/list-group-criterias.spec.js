import request from 'config/request';
import client from 'helper/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helper/Validate';
import successSchema from 'schemas/group_criterias/list/success';
import expiredTokenSchema from 'schemas/group_criterias/list/expired_token';

describe('List Group Criterias', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const res = await request
      .get('skill_groups')
      .set('Authorization', `Bearer ${client.accessToken}`);

    console.log(res.status);
    expect(res.status).toBe(200);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('expired token', async () => {
    const res = await request
      .get('skill_groups')
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
});
