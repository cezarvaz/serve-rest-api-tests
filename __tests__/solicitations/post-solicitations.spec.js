import request from 'config/request';
import client from 'helpers/AuthClient';
import fakerBr from 'faker-br';
import validate from 'helpers/Validate';
import successSchema from 'schemas/solicitations/post-solicitations';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

let payload;

describe('Create a solicitation', () => {
  beforeAll(async () => {
    await client.auth();

    const generateUniqueName = () => {
      return `Solicitation_${fakerBr.random.number({
        max: 999999999999,
      })}_criado pela automação de testes de API`;
    };

    payload = {
      solicitation: {
        name: generateUniqueName(),
        description: fakerBr.random.words(),
        started_at: '2029-11-21',
        finished_at: '2029-12-29',
      },
    };
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .post(`solicitations`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body.data).toMatchObject({
      type: 'solicitations',
      attributes: {
        name: payload.solicitation.name,
      },
    });
    expect(status).toBe(201);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  test('unsuccefully due to the same existing name', async () => {
    const { status, body, headers } = await request
      .post(`solicitations`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser criado',
      error: {
        name: [`${payload.solicitation.name} já foi cadastrado`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  test('unsuccefully due to the same empty', async () => {
    const { status, body, headers } = await request
      .post(`solicitations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        solicitation: {
          name: '',
          started_at: '',
          finished_at: '',
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    console.log(body);
    expect(body).toMatchObject({
      message: 'Não pode ser criado',
      error: {
        name: [`Este campo é obrigatório.`],
        started_at: [`Este campo é obrigatório.`],
        finished_at: [`Este campo é obrigatório.`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

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
        .post(`solicitations`)
        .send(payload)
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
