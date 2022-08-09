import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import EXPIRED_TOKEN from 'utils/constants';
import successSchema from 'schemas/skills/get/success';
import invalidIdSchema from 'schemas/skills/get/invalid-id';
import expiredTokenSchema from 'schemas/skills/list/expired-token';
import skills from 'factories/Skills';

describe('Get skill', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.getSkillsList();
  });

  test('successfully', async () => {
    const res = await request
      .get(`skills/${skills.skillId}`)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(skills.skillId);
    expect(res.body.data.type).toBe('skills');
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('expired token', async () => {
    const res = await request
      .get(`skills/${skills.skillId}`)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });

  test('unsuccessfully with invalid id', async () => {
    const res = await request
      .get('skills/a')
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(404);
    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Não pode ser mostrado');
    expect(validate.jsonSchema(res.body, invalidIdSchema)).toBe(true);
  });
});
