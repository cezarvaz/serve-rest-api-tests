import request from 'config/request';
import fakerBr from 'faker-br';
import client from 'helpers/AuthClient';
import skills from 'factories/Skills';
import positions from 'factories/Positions';
import validate from 'helpers/Validate';
import successSchema from 'schemas/positions/put-positions';
import unsuccessSchema from 'schemas/errors/put-position-error';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

let payload;

describe('Update Position', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.create();
    await positions.getPositionList();
    await skills.getList();
  });

  beforeEach(() => {
    payload = {
      position: {
        skill_ids: [skills.id],
      },
    };
  });

  test('successfully with one position', async () => {
    const { status, body, headers } = await request
      .put(`positions/${positions.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(202);
    expect(body.data.id).toBe(positions.positionIdList[0]);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Error'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Error'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Error'}
  `.test('unsuccessfully $scenario', async ({ id, statusCode, message }) => {
    const { status, body, headers } = await request
      .put(`positions/${id}`)
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
      .put(`positions/${positions.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        position: {
          skill_ids: [''],
        },
      });
    console.log(JSON.stringify(body, null, 2));
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser atualizado',
      error: {
        skill_ids: [`A  é uma competência inválida.`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, unsuccessSchema)).toBeTrue();
  });

  //https://solides.atlassian.net/browse/TDEP-4317
  test.skip('unsuccessfully due to the same null', async () => {
    const { status, body, headers } = await request
      .put(`positions/${positions.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        position: {
          skill_ids: [null],
        },
      });
    console.log(JSON.stringify(body, null, 2));
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser atualizado',
      error: {
        skill_ids: [`A  é uma competência inválida.`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, unsuccessSchema)).toBeTrue();
  });

  test('unsuccessfully due to the same invalid', async () => {
    const { status, body, headers } = await request
      .put(`positions/${positions.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        position: {
          skill_ids: [fakerBr.random.words()],
        },
      });
    console.log(JSON.stringify(body, null, 2));
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser atualizado',
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, unsuccessSchema)).toBeTrue();
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
        .put(`positions/${positions.positionIdList[0]}`)
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
