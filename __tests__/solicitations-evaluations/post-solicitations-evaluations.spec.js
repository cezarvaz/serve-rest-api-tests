import request from 'config/request';
import fakerBr from 'faker-br';
import client from 'helpers/AuthClient';
import Solicitations from 'factories/Solicitations';
import each from 'jest-each';
import validate from 'helpers/Validate';
import successSchema from 'schemas/solicitations-evaluations/post-solicitations-evaluations';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import solicitationsEvaluations from 'schemas/errors/solicitations-evaluations-error';
import errorsSchema from 'schemas/errors/errors';

let payload;
describe('Post solicitations evaluations', () => {
  beforeAll(async () => {
    await client.auth();
    await Solicitations.getLastItem();

    payload = {
      evaluation: {
        evaluators: [
          {
            evaluator_id: 518433,
            evaluator_name: 'LIDER API',
            evaluator_email: 'maite-barros76@fojsc.unesp.br',
          },
        ],
        evaluateds: [
          {
            evaluated_id: 518435,
            evaluated_name: 'Sebastião Yago Moura',
            position_id: 181842,
          },
          {
            evaluated_id: 518434,
            evaluated_name: 'Isabelle Maya Maya Barros',
            position_id: 181842,
          },
        ],
        moderated: false,
        self_evaluation: false,
      },
    };
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .post(`solicitations/${Solicitations.lastId}/evaluations`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);
    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    for (let i = 0; i < payload.evaluation.evaluateds.length; i++) {
      const expectedEvaluation = {
        type: 'evaluations',
        attributes: {
          solicitation_id: Solicitations.lastId,
          evaluator_id: payload.evaluation.evaluators[0].evaluator_id,
          evaluator_name: payload.evaluation.evaluators[0].evaluator_name,
          evaluated_id: payload.evaluation.evaluateds[i].evaluated_id,
          evaluated_name: payload.evaluation.evaluateds[i].evaluated_name,
          position_id: payload.evaluation.evaluateds[i].position_id,
        },
      };
      expect(body.data[i]).toMatchObject(expectedEvaluation);
    }
    expect(status).toBe(201);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Não pode ser mostrado'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Não pode ser mostrado'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Não pode ser mostrado'}
  `.test('unsuccessfully $scenario', async ({ id, statusCode, message }) => {
    const { status, body, headers } = await request
      .post(`solicitations/${id}/evaluations`)
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
      .post(`solicitations/${Solicitations.lastId}/evaluations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        evaluation: {
          evaluators: [
            {
              evaluator_id: '',
              evaluator_name: '',
              evaluator_email: '',
            },
          ],
          evaluateds: [
            {
              evaluated_id: '',
              evaluated_name: '',
              position_id: '',
            },
            {
              evaluated_id: '',
              evaluated_name: '',
              position_id: '',
            },
          ],
          moderated: '',
          self_evaluation: '',
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser criado',
      error: {
        evaluator_id: [`Este campo é obrigatório.`],
        evaluated_id: [`Este campo é obrigatório.`],
        evaluated_name: [`Este campo é obrigatório.`],
        position_id: [`Este campo é obrigatório.`],
        evaluator_email: [`Este campo é obrigatório.`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, solicitationsEvaluations)).toBeTrue();
  });

  test('unsuccessfully due to the same null', async () => {
    const { status, body, headers } = await request
      .post(`solicitations/${Solicitations.lastId}/evaluations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        evaluation: {
          evaluators: [
            {
              evaluator_id: null,
              evaluator_name: null,
              evaluator_email: null,
            },
          ],
          evaluateds: [
            {
              evaluated_id: null,
              evaluated_name: null,
              position_id: null,
            },
            {
              evaluated_id: null,
              evaluated_name: null,
              position_id: null,
            },
          ],
          moderated: null,
          self_evaluation: null,
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser criado',
      error: {
        evaluator_id: [`Este campo é obrigatório.`],
        evaluated_id: [`Este campo é obrigatório.`],
        evaluated_name: [`Este campo é obrigatório.`],
        position_id: [`Este campo é obrigatório.`],
        evaluator_email: [`Este campo é obrigatório.`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, solicitationsEvaluations)).toBeTrue();
  });

  test('unsuccessfully due to the same invalid', async () => {
    const { status, body, headers } = await request
      .post(`solicitations/${Solicitations.lastId}/evaluations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send({
        ...payload,
        evaluation: {
          evaluators: [
            {
              evaluator_id: fakerBr.random.words(),
              evaluator_name: fakerBr.random.words(),
              evaluator_email: fakerBr.random.words(),
            },
          ],
          evaluateds: [
            {
              evaluated_id: fakerBr.random.words(),
              evaluated_name: fakerBr.random.words(),
              position_id: fakerBr.random.words(),
            },
            {
              evaluated_id: fakerBr.random.words(),
              evaluated_name: fakerBr.random.words(),
              position_id: fakerBr.random.words(),
            },
          ],
          moderated: false,
          self_evaluation: false,
        },
      });

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body).toMatchObject({
      message: 'Não pode ser criado',
      error: {
        evaluator_id: [null],
        evaluated_id: [null],
        position_id: [null],
        evaluator_email: [`E-mail inválido`],
      },
    });
    expect(status).toBe(422);
    expect(validate.jsonSchema(body, solicitationsEvaluations)).toBeTrue();
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
        .post(`solicitations/${Solicitations.lastId}/evaluations`)
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
