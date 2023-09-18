import request from 'config/request';
import client from 'helpers/AuthClient';
import Solicitations from 'factories/Solicitations';
import each from 'jest-each';
import SolicitationsEvaluations from 'factories/SolicitationsEvaluations';
import Rates from 'factories/Rates';
import validate from 'helpers/Validate';
import successSchema from 'schemas/rates-avarege/get-rates-avarege';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

describe('Get rates avarege', () => {
  beforeAll(async () => {
    await client.auth();
    await Solicitations.create();
    await SolicitationsEvaluations.create(Solicitations.id);
    await Rates.create(SolicitationsEvaluations.evaluationsId);
  });

  afterAll(async () => {
    await Solicitations.deleteSolicitationById(Solicitations.id);
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .get(
        `solicitations/${Solicitations.id}/evaluateds/${SolicitationsEvaluations.evaluatedId}/averages`,
      )
      .set('Authorization', `Bearer ${client.accessToken}`);
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
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
          `solicitations/${id}/evaluateds/${SolicitationsEvaluations.evaluatedId}/averages`,
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
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Error'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Error'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Error'}
  `.test(
    'unsuccessfully evaluated $scenario',
    async ({ id, statusCode, message }) => {
      const { status, body, headers } = await request
        .get(`solicitations/${Solicitations.id}/evaluateds/${id}/averages`)
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
          `solicitations/${Solicitations.id}/evaluateds/${SolicitationsEvaluations.evaluatedId}/averages`,
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