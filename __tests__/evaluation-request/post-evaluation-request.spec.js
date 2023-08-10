import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from 'factories/EvaluationRequest';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';

describe('Create requests to generate a report or create evaluation request', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .post(`evaluation_requests`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(evaluation.postPayload());

    expect(headers).toHaveProperty('content-type', 'application/json');
    expect(status).toBe(204);
    expect(body).toBe('');
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
      const { status, body, headers } = await request
        .post(`evaluation_requests`)
        .send(evaluation.postPayload())
        .set('Authorization', token);

      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(status).toBe(401);
      expect(body.errors).toBe('decoding error');

      expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
    },
  );
});
