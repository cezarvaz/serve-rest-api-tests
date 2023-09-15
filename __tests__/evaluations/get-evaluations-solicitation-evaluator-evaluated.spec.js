import request from 'config/request';
import client from 'helpers/AuthClient';
import each from 'jest-each';
import Evaluations from 'factories/Evaluations';
import validate from 'helpers/Validate';
import successSchema from 'schemas/evaluations/get-evaluations-solicitation-evaluator-evaluated';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

describe('Get evaluations', () => {
  beforeAll(async () => {
    await client.auth();
    await Evaluations.getEvaluations();
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .get(
        `evaluations/${Evaluations.solicitationId}/${Evaluations.evaluatorId}/${Evaluations.evaluatedId}`,
      )
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body.data).toMatchObject({
      id: Evaluations.IdEvaluation,
      type: 'evaluations',
      attributes: {
        solicitation_id: Evaluations.solicitationId,
        evaluator_id: Evaluations.evaluatorId,
        evaluated_id: Evaluations.evaluatedId,
      },
    });
    expect(status).toBe(200);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Não pode ser mostrado'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Não pode ser mostrado'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Não pode ser mostrado'}
  `.test(
    'unsuccessfully solicitation $scenario',
    async ({ id, statusCode, message }) => {
      const { status, body, headers } = await request
        .get(
          `evaluations/${id}/${Evaluations.evaluatorId}/${Evaluations.evaluatedId}`,
        )
        .set('Authorization', `Bearer ${client.accessToken}`);

      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(status).toBe(statusCode);
      expect(body.errors.message).toBe(message);
      expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
    },
  );

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Não pode ser mostrado'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Não pode ser mostrado'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Não pode ser mostrado'}
  `.test(
    'unsuccessfully evaluator $scenario',
    async ({ id, statusCode, message }) => {
      const { status, body, headers } = await request
        .get(
          `evaluations/${Evaluations.solicitationId}/${id}/${Evaluations.evaluatedId}`,
        )
        .set('Authorization', `Bearer ${client.accessToken}`);

      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(status).toBe(statusCode);
      expect(body.errors.message).toBe(message);
      expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
    },
  );

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Não pode ser mostrado'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Não pode ser mostrado'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Não pode ser mostrado'}
  `.test(
    'unsuccessfully evaluated $scenario',
    async ({ id, statusCode, message }) => {
      const { status, body, headers } = await request
        .get(
          `evaluations/${Evaluations.solicitationId}/${Evaluations.evaluatorId}/${id}`,
        )
        .set('Authorization', `Bearer ${client.accessToken}`);

      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(status).toBe(statusCode);
      expect(body.errors.message).toBe(message);
      expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
    },
  );

  each`
  token                       | scenario               | statusCode | message
  ${'token'}                  | ${'an invalid'}        | ${403}     | ${'RESOURCE Forbidden'}
  ${null}                     | ${'a null'}            | ${403}     | ${'RESOURCE Forbidden'}
  ${''}                       | ${'an empty'}          | ${401}     | ${'Unauthorized'}
  ${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .get(
          `evaluations/${Evaluations.solicitationId}/${Evaluations.evaluatorId}/${Evaluations.evaluatedId}`,
        )
        .set('Authorization', token);
      if (token === EXPIRED_TOKEN || token === UNAUTHORIZED_TOKEN) {
        expect(headers).toHaveProperty(
          'content-type',
          'application/json; charset=utf-8',
        );
        expect(body.errors).toBe(message);
        expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
      } else {
        expect(headers).toHaveProperty('content-type', 'application/json');
        expect(body.error.message).toBe(message);
        expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
      }
      expect(status).toBe(statusCode);
    },
  );
});
