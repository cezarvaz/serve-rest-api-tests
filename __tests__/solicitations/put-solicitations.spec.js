import request from 'config/request';
import client from 'helpers/AuthClient';
import Solicitations from 'factories/Solicitations';
import fakerBr from 'faker-br';
import validate from 'helpers/Validate';
import successSchema from 'schemas/solicitations/put-solicitations';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

let payload;

describe('Edit a solicitation', () => {
  beforeAll(async () => {
    await client.auth();
    await Solicitations.getLastItem();
    await Solicitations.create();

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

  afterAll(async () => {
    if (Solicitations.id) {
      await Solicitations.deleteSolicitationById(Solicitations.id);
    }
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .put(`solicitations/${Solicitations.id}`)
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
        description: payload.solicitation.description,
        started_at: payload.solicitation.started_at,
        finished_at: payload.solicitation.finished_at,
      },
    });
    expect(status).toBe(202);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  test('unsuccessfully due to the same existing name', async () => {
    const { status, body, headers } = await request
      .put(`solicitations/${Solicitations.lastId}`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser atualizado',
      error: {
        name: [`${payload.solicitation.name} já foi cadastrado`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  // https://solides.atlassian.net/browse/TDEP-4034
  test.skip('unsuccessfully due to the same empty', async () => {
    const { status, body, headers } = await request
      .put(`solicitations/${Solicitations.lastId}`)
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

  test.skip('unsuccessfully due to the same null', async () => {
    const { status, body, headers } = await request
      .put(`solicitations/${Solicitations.lastId}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        solicitation: {
          name: null,
          started_at: null,
          finished_at: null,
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
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

  test.skip('unsuccessfully due to the same invalid', async () => {
    const { status, body, headers } = await request
      .put(`solicitations/${Solicitations.lastId}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        solicitation: {
          started_at: fakerBr.random.words(),
          finished_at: fakerBr.random.words(),
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
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
        .put(`solicitations/${Solicitations.lastId}`)
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
