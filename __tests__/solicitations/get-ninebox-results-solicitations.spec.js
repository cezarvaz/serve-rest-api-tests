import request from 'config/request';
import client from 'helpers/AuthClient';
import Solicitations from 'factories/Solicitations';
import each from 'jest-each';
import validate from 'helpers/Validate';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';
import successSchema from 'schemas/solicitations/get-ninebox-results-solicitations';
import errorsSchema from 'schemas/errors/errors';

describe('Get ninebox results Solicitations by id', () => {
  beforeAll(async () => {
    await client.auth();
    await Solicitations.create();
  });

  afterAll(async () => {
    await Solicitations.deleteSolicitationById(Solicitations.id);
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .get(`solicitations/${Solicitations.id}/ninebox_results`)
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
  `.test('unsuccessfully $scenario', async ({ id, statusCode, message }) => {
    const { status, body, headers } = await request
      .get(`solicitations/${id}/ninebox_results`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(statusCode);
    expect(body.errors.message).toBe(message);
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
        .get(`solicitations/${Solicitations.id}/ninebox_results`)
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
