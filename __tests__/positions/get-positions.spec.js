import request from 'config/request';
import client from 'helpers/AuthClient';
import skills from 'factories/Skills';
import validate from 'helpers/Validate';
import successSchema from 'schemas/positions/get/success';
import invalidIdSchema from 'schemas/positions/get/invalid-id';

describe('Get Position', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.getPositionList();
  });

  test('successfully', async () => {
    const res = await request
      .get(`positions/${skills.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(200);
    expect(validate.jsonSchema(res.body, successSchema)).toBeTrue();
  });

  // test('expired token', async () => {
  //   const res = await request
  //     .get(`positions/${skills.positionIdList[0]}`)
  //     .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

  //   expect(res.headers).toHaveProperty(
  //     'content-type',
  //     'application/json; charset=utf-8'
  //   );
  //   expect(res.status).toBe(401);

  //   expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBeTrue();
  // });

  test('unsuccessfully with invalid id', async () => {
    const res = await request
      .get(`positions/a`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(404);

    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Error');
    expect(validate.jsonSchema(res.body, invalidIdSchema)).toBeTrue();
  });
});
