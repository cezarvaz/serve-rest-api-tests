import request from 'config/internal-request';
import client from 'helpers/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helpers/Validate';
import successSchema from 'schemas/departments/get/success';
import expiredTokenSchema from 'schemas/departments/get/expired-token';

describe('Department List', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const res = await request
      .get('departments')
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(200);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('expired token', async () => {
    const res = await request
      .get('departments')
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
});
