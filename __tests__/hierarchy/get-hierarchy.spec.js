import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import successSchema from 'schemas/hierarchy/get/success';

describe('Hierarchies list', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const res = await request
      .get('hierarchy')
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(200);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  // test('expired token', async () => {
  //   const res = await request
  //     .get('hierarchy')
  //     .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

  //   expect(res.headers).toHaveProperty(
  //     'content-type',
  //     'application/json; charset=utf-8'
  //   );
  //   expect(res.status).toBe(401);
  //   expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  // });
});
