import request from 'config/request';
import client from 'helpers/AuthClient';
import fakerBr from 'faker-br';
import validate from 'helpers/Validate';
import successSchema from 'schemas/solicitations/post/success';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

let payload, registeredName;

describe('Create a solicitation', () => {
  beforeAll(async () => {
    await client.auth();
  });

  beforeEach(async () => {
    payload = {
      solicitation: {
        name: `Solicitation_${fakerBr.random.number({
          max: 999999999999,
        })}_criada pela automação de testes de API`,
        description: fakerBr.random.words(),
        started_at: '2029-11-21',
        finished_at: '2029-12-29',
      },
    };
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .post(`solicitations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);
    expect(body.data.type).toBe('solicitations');
    expect(body.data.attributes.name).toBe(payload.solicitation.name);

    expect(validate.jsonSchema(body, successSchema)).toBeTrue();

    registeredName = payload.solicitation.name;
  });

  test('existing name', async () => {
    payload.solicitation.name = registeredName;

    const { status, body, headers } = await request
      .post(`solicitations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    expect(body.error.name[0]).toBe(
      `${payload.solicitation.name} já foi cadastrado`,
    );

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  test('empty name', async () => {
    payload.solicitation.name = '';

    const { status, body, headers } = await request
      .post(`solicitations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    expect(body.error.name[0]).toBe('Este campo é obrigatório.');

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  each`
  token      | scenario        | statusCode | message
  ${'token'} | ${'an invalid'} | ${403}     | ${'RESOURCE Forbidden'}
  ${null}    | ${'a null'}     | ${403}     | ${'RESOURCE Forbidden'}
  ${''}      | ${'an empty'}   | ${401}     | ${'Unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .post(`solicitations`)
        .set('Authorization', token)
        .send(payload);

      expect(headers).toHaveProperty('content-type', 'application/json');
      expect(status).toBe(statusCode);
      expect(body.error.message).toBe(message);

      expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
    },
  );

  each`
  token                | scenario             
  ${EXPIRED_TOKEN}     | ${'an expired'}     
  ${UNAUTHORIZED_TOKEN}| ${'an unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token }) => {
      const { status, body, headers } = await request
        .post(`solicitations`)
        .set('Authorization', token)
        .send(payload);

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
