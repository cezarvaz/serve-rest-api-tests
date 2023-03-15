import request from 'config/request';
import client from 'helpers/AuthClient';
import skills from 'factories/Skills';
import validate from 'helpers/Validate';
import successSchema from 'schemas/positions/get/success';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

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

  each`
  id             | scenario            
  ${'a'}         | ${'an invalid'}
  ${null}        | ${'a null'}
  ${'999999999'} | ${'an inexistent'}
  `.test('should validate $scenario id', async ({ id }) => {
    const res = await request
      .get(`positions/${id}`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(404);
    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Error');

    expect(validate.jsonSchema(res.body, errorsSchema)).toBeTrue();
  });

  each`
  token                | scenario            
  ${'token'}           | ${'an invalid'}
  ${null}              | ${'a null'}
  ${''}                | ${'an empty'}
  ${EXPIRED_TOKEN}     | ${'an expired'}
  ${UNAUTHORIZED_TOKEN}| ${'an unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token }) => {
      const res = await request.get('positions').set('Authorization', token);

      expect(res.headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8'
      );
      expect(res.status).toBe(401);
      expect(res.body.errors).toBe('decoding error');

      expect(validate.jsonSchema(res.body, simpleErrorSchema)).toBeTrue();
    }
  );
});
