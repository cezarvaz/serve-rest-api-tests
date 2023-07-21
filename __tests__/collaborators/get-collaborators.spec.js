import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import getCollaboratorsSchema from 'schemas/collaborators/get-collaborators';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';

describe('Get collaborators list', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const res = await request
      .get('collaborators')
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(200);

    expect(validate.jsonSchema(res.body, getCollaboratorsSchema)).toBeTrue();
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
      const res = await request
        .get('collaborators')
        .set('Authorization', token);

      expect(res.headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(401);
      expect(res.body.errors).toBe('decoding error');

      expect(validate.jsonSchema(res.body, simpleErrorSchema)).toBeTrue();
    },
  );
});
