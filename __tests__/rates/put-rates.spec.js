import request from 'config/request';
import fakerBr from 'faker-br';
import client from 'helpers/AuthClient';
import Rates from 'factories/Rates';
import Solicitations from 'factories/Solicitations';
import SolicitationsEvaluations from 'factories/SolicitationsEvaluations';
import each from 'jest-each';
import validate from 'helpers/Validate';
import successSchema from 'schemas/rates/post-rates';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import ratesErrorSchema from 'schemas/errors/rates-error';
import errorsSchema from 'schemas/errors/errors';

let payload;
describe('put rates', () => {
  beforeAll(async () => {
    await client.auth();
    await Solicitations.getItem(7);
    await SolicitationsEvaluations.create(Solicitations.lastId);
    await Rates.getLastItem(Solicitations.lastId);

    payload = {
      rate: {
        rates_attributes: [
          { rate: fakerBr.random.number({ min: 1, max: 5 }), skill_id: 8051 },
          { rate: fakerBr.random.number({ min: 1, max: 5 }), skill_id: 8418 },
          { rate: fakerBr.random.number({ min: 1, max: 5 }), skill_id: 8799 },
        ],
        comments_attributes: {
          text: '<p>Teste API</p>',
        },
      },
    };
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .put(`evaluations/${Rates.evaluationId}/rates`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(202);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Não pode ser mostrado'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Não pode ser mostrado'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Não pode ser mostrado'}
  `.test('unsuccessfully $scenario', async ({ id, statusCode, message }) => {
    const { status, body, headers } = await request
      .put(`evaluations/${id}/rates`)
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
      .put(`evaluations/${Rates.evaluationId}/rates`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        rate: {
          rates_attributes: [
            { rate: '', skill_id: '' },
            { rate: '', skill_id: '' },
            { rate: '', skill_id: '' },
          ],
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser atualizado',
      error: {
        rate: [
          `Este campo é obrigatório.`,
          `Este campo é obrigatório.`,
          `Este campo é obrigatório.`,
        ],
        skill_id: [
          `Este campo é obrigatório.`,
          `Este campo é obrigatório.`,
          `Este campo é obrigatório.`,
        ],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, ratesErrorSchema)).toBeTrue();
  });

  test('unsuccessfully due to the same null', async () => {
    const { status, body, headers } = await request
      .put(`evaluations/${Rates.evaluationId}/rates`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        rate: {
          rates_attributes: [
            { rate: null, skill_id: null },
            { rate: null, skill_id: null },
            { rate: null, skill_id: null },
          ],
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser atualizado',
      error: {
        rate: [
          `Este campo é obrigatório.`,
          `Este campo é obrigatório.`,
          `Este campo é obrigatório.`,
        ],
        skill_id: [
          `Este campo é obrigatório.`,
          `Este campo é obrigatório.`,
          `Este campo é obrigatório.`,
        ],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, ratesErrorSchema)).toBeTrue();
  });

  //https://solides.atlassian.net/browse/TDEP-4060
  test.skip('unsuccessfully due to the same invalid', async () => {
    const { status, body, headers } = await request
      .put(`evaluations/${Rates.evaluationId}/rates`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        rate: {
          rates_attributes: [
            { rate: fakerBr.random.words(), skill_id: fakerBr.random.words() },
            { rate: fakerBr.random.words(), skill_id: fakerBr.random.words() },
            { rate: fakerBr.random.words(), skill_id: fakerBr.random.words() },
          ],
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    // expect(body).toMatchObject({
    //   message: 'Não pode ser atualizado',
    //   error: {
    //     rate: [
    //       `Este campo é obrigatório.`,
    //       `Este campo é obrigatório.`,
    //       `Este campo é obrigatório.`,
    //     ],
    //     skill_id: [
    //       `Este campo é obrigatório.`,
    //       `Este campo é obrigatório.`,
    //       `Este campo é obrigatório.`,
    //     ],
    //   },
    // });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, ratesErrorSchema)).toBeTrue();
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
        .put(`evaluations/${Rates.evaluationId}/rates`)
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
