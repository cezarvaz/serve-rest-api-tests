import request from 'config/request';
import fakerBr from 'faker-br';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from 'factories/EvaluationRequest';
import successSchema from 'schemas/evaluation-request/put-evaluation-request';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';
import evaluationRequestErrorSchema from 'schemas/errors/evaluation-request-error';

let payload;
describe('Edit Evaluation Request', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.create();
    await evaluation.getEvaluationList();

    payload = {
      evaluation_request: {
        expired_at: fakerBr.date.future().toISOString().split('T')[0],
        resend: true,
      },
    };
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .put(`evaluation_requests/${evaluation.evaluationId}`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body.data).toMatchObject({
      id: evaluation.evaluationId,
      type: 'evaluation_requests',
      attributes: {
        expired_at: payload.evaluation_request.expired_at,
      },
    });
    expect(status).toBe(202);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Error'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Error'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Error'}
  `.test('unsuccessfully $scenario', async ({ id, statusCode, message }) => {
    const { status, body, headers } = await request
      .put(`evaluation_requests/${id}`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(statusCode);
    expect(body.errors.message).toBe(message);
    expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
  });

  test('unsuccessfully due to the same empty', async () => {
    const { status, body, headers } = await request
      .put(`evaluation_requests/${evaluation.evaluationId}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        evaluation_request: {
          expired_at: '',
          resend: '',
        },
      });
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body.errors.message).toBe('Error');
    expect(status).toBe(400);
    expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
  });

  test('unsuccessfully due to the same invalid', async () => {
    const { status, body, headers } = await request
      .put(`evaluation_requests/${evaluation.evaluationId}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        evaluation_request: {
          expired_at: fakerBr.random.words(),
          resend: fakerBr.random.words(),
        },
      });
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser atualizado',
      error: {
        expired_at: [`Não é uma data válida`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, evaluationRequestErrorSchema)).toBeTrue();
  });

  //https://solides.atlassian.net/browse/TDEP-4095
  test.skip('unsuccessfully due to the same null', async () => {
    const { status, body, headers } = await request
      .put(`evaluation_requests/${evaluation.evaluationId}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        evaluation_request: {
          expired_at: null,
          resend: null,
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body.errors.message).toBe('Error');
    expect(status).toBe(400);
    expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
  });

  each`
  token                       | scenario               | statusCode | message
  ${'token'}                  | ${'an invalid'}        | ${401}     | ${'decoding error'}
  ${null}                     | ${'a null'}            | ${401}     | ${'decoding error'}
  ${''}                       | ${'an empty'}          | ${401}     | ${'decoding error'}
  ${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .put(`evaluation_requests/${evaluation.evaluationId}`)
        .send(payload)
        .set('Authorization', token);
      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(body.errors).toBe(message);
      expect(status).toBe(statusCode);
      expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
    },
  );
});
