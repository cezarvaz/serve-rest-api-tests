import request from 'config/request';
import client from 'helper/AuthClient';
import groupCriteria from 'helper/GroupCriteria';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helper/Validate';
import successSchema from 'schemas/skill_groups/list/success';
import expiredTokenSchema from 'schemas/skill_groups/list/expired_token';

describe('List Group Criterias', () => {
  beforeAll(async () => {
    await client.auth();
    await groupCriteria.create();
  });

  test('successfully', async () => {
    const res = await request
      .get('skill_groups')
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(200);

    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('expired token', async () => {
    const res = await request
      .get('skill_groups')
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);

    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
});
