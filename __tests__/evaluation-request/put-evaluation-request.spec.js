import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from 'factories/EvaluationRequest';
import successSchema from 'schemas/evaluation-request/put/success';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

describe('Edit Evaluation Request', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.create();
    await evaluation.getEvaluationList();
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .put(`evaluation_requests/${evaluation.evaluationId}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(evaluation.putPayload());

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(202);

    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  id             | scenario            
  ${'a'}         | ${'an invalid'}
  ${null}        | ${'a null'}
  ${'999999999'} | ${'an inexistent'}
  `.test('should validate $scenario id', async ({ id }) => {
    const { status, body, headers } = await request
      .put(`evaluation_requests/${id}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(evaluation.putPayload());

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(404);
    expect(body.errors.status).toBe(404);
    expect(body.errors.message).toBe('Error');

    expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
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
        .put(`evaluation_requests/${evaluation.evaluationId}`)
        .send(evaluation.putPayload())
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
